import { shallowMount } from '@vue/test-utils'
import Indecision from '@/components/Indecision'

describe('Indecision component', () => {
  let wrapper
  let clgSpy
  let getAnswerSpy

  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({
      answer: 'yes',
      forced: false,
      image: 'https://yesno.wtf/assets/yes/2.gif'
    })
  }))

  beforeEach(() => {
    wrapper = shallowMount(Indecision)
    clgSpy = jest.spyOn(console, 'log')
    getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer')

    jest.clearAllMocks()
  })

  test('should be match with the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should not be triggered a search when the user types in the input', async () => {
    const input = wrapper.find('input')
    await input.setValue('tendré suerte')
    expect(clgSpy).toHaveBeenCalled()
    expect(getAnswerSpy).toHaveBeenCalledTimes(0)
  })

  test('should be triggered the get Answer when the user types "?" in the input', async () => {
    const input = wrapper.find('input')
    await input.setValue('Hola mundo?')
    expect(clgSpy).toHaveBeenCalled()
    expect(getAnswerSpy).toHaveBeenCalled()
  })

  test('should be a valid functionality getAnswer', async () => {
    await wrapper.vm.getAnswer()
    const image = wrapper.find('img')

    expect(image.exists()).toBeTruthy()
    expect(wrapper.vm.image).toBe('https://yesno.wtf/assets/yes/2.gif')
    expect(wrapper.vm.answer).toBe('Si')
  })

  test('API failure', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('API is not working')))

    await wrapper.vm.getAnswer()
    const image = wrapper.find('img')
    expect(image.exists()).toBeFalsy()
    expect(wrapper.vm.answer).toBe('No se pudo cargarla información del API')
  })
})
