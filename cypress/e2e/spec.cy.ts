describe('template spec', () => {
  it('logs in with the test email and password', () => {
    cy.visit('http://localhost:3000/login')

    const testEmail = Cypress.env('TEST_EMAIL')
    const testPassword = Cypress.env('TEST_PASSWORD')

    // Ensure the page loads properly and the email input is visible
    cy.get('input[name="email"]').type(testEmail)
  
    // Enter the password
    cy.get('input[name="password"]').type(testPassword)
  
    // Click the login button
    cy.get('button[type="submit"]').click()
  
    // Assert the user is redirected to the dashboard
    cy.url().should('include', '/dashboard')
  })
})
