// Test suite
describe('Example Component', () => {
  // Individual tests
  test('Debe de ser mayor a 10', () => {
    // Arreglar
    let value = 5
    // Estimulo
    value = value + 10
    // Observar el resultado
    expect(value).toBeGreaterThan(10)
  })
})
