//const { it } = require("mocha");

//const { beforeEach } = require("mocha")
Cypress.Commands.add('getFrameBody', (frameName) => {
  cy.get('frame[name="'+frameName+'"]')//'frame[name="frameName"]
  .its('0.contentDocument').should('exist')
  .its('body').should('not.be.undefined')
  .then(cy.wrap)
});

Cypress.Commands.add('findByTestName', (name) => {
  find('a[data-test="'+name+'"]')
});

describe('sh_system', () => {
  
    
  beforeEach(function () {
    cy.visit('http://localhost/Sh_system_new/_var_www_html/')
    cy.viewport(1920,1080)
  });

  it('open', () => {
    
    cy.getFrameBody('hore').find('a[name=site_newFilters]').click()
    cy.wait(1000) //na nacitanie druheho frameu
    cy.getFrameBody('dole').find('i').click()
    
  });

  it('hore menu exist', () => {
    
    cy.getFrameBody('hore').find('[data-test="zadaj-ulohu"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="zadaj-partnera"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="zadaj-okruh"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="filtre-juro"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="filtre-zdeno"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="filtre-marta"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="filtre-miro"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="filtre-xx"]').should('exist')
    
    cy.getFrameBody('hore').find('[data-test="filtre-nevybavene"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="filtre-filter"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="filtre-vsetky"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="filtre-vybavene"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="newFilters"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="php-admin"]').should('exist')
    cy.getFrameBody('hore').find('[data-test="shSystem-site"]').should('exist')
  });

  
})

describe('sh_system-newFilters', () => {
  
    
  beforeEach(function () {
    cy.visit('http://localhost/Sh_system_new/_var_www_html/')
    cy.viewport(1920,1080)
    cy.getFrameBody('hore').find('a[name=site_newFilters]').click()
    cy.wait(1000) //na nacitanie druheho frameu
  });

  it('main view everithing exists', () => {
    cy.getFrameBody('dole').find('[data-test="main-icon"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="select-filters"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-apply"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="table-tasks"]').should('exist')
  });

  it('sidebar everything exists', () => {
    cy.getFrameBody('dole').find('[data-test="main-icon"]').click()

    cy.getFrameBody('dole').find('[data-test="select-vybavene"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-add-vybavene"]').should('exist')

    cy.getFrameBody('dole').find('[data-test="list-zamestnanci"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="select-zamestnanci"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-add-zamestnanci"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-create-zamestnanci"]').should('exist')

    cy.getFrameBody('dole').find('[data-test="list-partneri"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="select-partneri"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-add-partneri"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-create-partneri"]').should('exist')

    cy.getFrameBody('dole').find('[data-test="list-okruhy"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="select-okruhy"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-add-okruhy"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-create-okruhy"]').should('exist')

    cy.getFrameBody('dole').find('[data-test="list-priority"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="select-priority"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-add-priority"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-create-priority"]').should('exist')

    cy.getFrameBody('dole').find('[data-test="list-cast_dna"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="select-cast_dna"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-add-cast_dna"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-create-cast_dna"]').should('exist')

    cy.getFrameBody('dole').find('[data-test="input-date-OD"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="input-date-DO"]').should('exist')
    cy.getFrameBody('dole').find('[data-test="button-date"]').should('exist')

    cy.getFrameBody('dole').find('[data-test="button-save-lists-to-DB"]').should('exist')
  });
  
})