const username = `luisrodriguez${Math.round(Math.random() * 1000000000)}`
const password = '15963'
describe('api demoblaze', () => {

  it('Crear un usuario nuevo en signup', () => {

    cy.request({
      url: 'https://api.demoblaze.com/signup',
      method: 'POST',
      body: {
        username,
        password
      },
    })
    .then(response => {
      expect(response.body).to.not.have.property('errorMessage', 'This user already exist.')
    })
    
  })

  it('intentar crear un usuario ya existente en signup', () => {

    cy.request({
      url: 'https://api.demoblaze.com/signup',
      method: 'POST',
      body: {
        username: "yarelee",
        password
      },
    })
    .then(response => {
      expect(response.body).to.have.property('errorMessage', 'This user already exist.')
    })
    
  })


  it('Usuario y password correcto en el login ', () => {

    cy.request({
      url: 'https://api.demoblaze.com/login',
      method: 'POST',
      body: {
        username,
        password
      },
    })
    .then(response => {
      expect(response.body).to.not.have.property('errorMessage', 'Wrong password.')
    })
    
  })


  it('Usuario no existe en el login ', () => {

    cy.request({
      url: 'https://api.demoblaze.com/login',
      method: 'POST',
      body: {
        username: "yareleeee",
        password: '159636'
      },
    })
    .then(response => {
      expect(response.body).to.have.property('errorMessage', 'User does not exist.')
    })  
  })

  it('usuario existe pero la clave es invalidad en el login ', () => {

    cy.request({
      url: 'https://api.demoblaze.com/login',
      method: 'POST',
      body: {
        username,
        password: '159636'
      },
    })
    .then(response => {
      expect(response.body).to.have.property('errorMessage', 'Wrong password.')
    })
  })
})