describe('demo', () => {
  beforeEach(() => cy.visit('/iframe.html?id=pollv1component--primary&knob-poll'));

  it('should render the component', () => {
    cy.get('app-poll-v1').should('exist');
  });
});
