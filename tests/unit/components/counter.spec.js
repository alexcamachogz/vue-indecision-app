import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Counter)
  })

  test('Should be match with the snapshot', () => {
    const wrapper = shallowMount(Counter)
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should render value by default', () => {
    expect(wrapper.find('h2').exists()).toBeTruthy()

    const h2Value = wrapper.find('h2').text()
    expect(h2Value).toEqual('Counter')
  })

  test('should be 100 the defaul value on p', () => {
    const pValue = wrapper.find('[data-testId="counter"]').text()
    expect(pValue).toBe('100')
  })

  test('should be increase and decrease in 1 the counter value', async () => {
    const [incraseBtn, decreaseBtn] = wrapper.findAll('button')

    await incraseBtn.trigger('click')
    await incraseBtn.trigger('click')
    await incraseBtn.trigger('click')
    await decreaseBtn.trigger('click')
    await decreaseBtn.trigger('click')

    const value = wrapper.find('[data-testId="counter"]').text()
    expect(value).toBe('101')
  })

  test('should be set the default value', () => {
    const start = wrapper.props('start')
    const value = wrapper.find('[data-testId="counter"]').text()
    expect(Number(value)).toBe(start)
  })

  test('should be show the prop title', () => {
    const title = 'Hola Alex'
    const wrapper = shallowMount(Counter, {
      props: {
        title
      }
    })
    const value = wrapper.find('h2').text()
    expect(value).toBe(title)
  })
})
