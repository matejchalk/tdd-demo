describe('demo', () => {
  beforeEach(() => cy.visit('/iframe.html?id=pollv2component--primary&knob-poll'));

  it('should render the component', () => {
    cy.get('app-poll-v2').should('exist');
  });
});
