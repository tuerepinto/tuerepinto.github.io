// utilities
var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

// setup typewriter effect in the terminal demo
if (document.getElementsByClassName('demo').length > 0) {
  var i = 0;
  var txt = `~/perfil/arquiteto-de-solucoes/.tuerepinto

            #Sobre
            Platform & Engineering Architecture Specialist, baseado em Belo Horizonte (MG).
            Projeto e entrego infraestruturas resilientes (microsserviços, streaming,
            plataformas de dados) para o setor financeiro, com foco em alta vazão,
            baixa latência e governança robusta.

            #Formação
            PUC Minas — Pós-graduação em Inteligência Artificial e Aprendizado de Máquina
            TCC: Smart Order Router com Deep Q-Learning + Mixture of Experts

            #Destaque
            Palestrante no TDC 2026 São Paulo — trilha Agentes de IA
            "Além do Hype: Agente Autônomo"

            #Mais detalhes
            https://www.linkedin.com/in/tuerepinto/`;
  var speed = 35;

  function typeItOut () {
    if (i < txt.length) {
      document.getElementsByClassName('demo')[0].innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeItOut, speed);
    }
  }

  setTimeout(typeItOut, 1200);
}

// toggle tabs on codeblock
window.addEventListener("load", function() {
  var tabContainers = getAll(".tab__container");

  for (var i = 0; i < tabContainers.length; i++) {
    get('.tab__menu', tabContainers[i]).addEventListener("click", tabClick);
  }

  function tabClick (event) {
    var scope = event.currentTarget.parentNode;
    var clickedTab = event.target;
    var tabs = getAll('.tab', scope);
    var panes = getAll('.tab__pane', scope);
    var activePane = get(`.${clickedTab.getAttribute('data-tab')}`, scope);

    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }

    for (var i = 0; i < panes.length; i++) {
      panes[i].classList.remove('active');
    }

    clickedTab.classList.add('active');
    activePane.classList.add('active');
  }
});

// in page scrolling
var btns = getAll('.js-btn');
var sections = getAll('.js-section');

function setActiveLink(event) {
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }
  event.target.classList.add('selected');
}

function smoothScrollTo(element, event) {
  setActiveLink(event);
  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop - 20,
    'left': 0
  });
}

if (btns.length && sections.length > 0) {
  for (var b = 0; b < btns.length; b++) {
    (function (index) {
      btns[index].addEventListener('click', function (event) {
        smoothScrollTo(sections[index], event);
      });
    })(b);
  }
}

window.addEventListener('scroll', function () {
  var docNav = get('.doc__nav > ul');
  if (docNav) {
    if (window.pageYOffset > 63) {
      docNav.classList.add('fixed');
    } else {
      docNav.classList.remove('fixed');
    }
  }
});

// responsive navigation
var topNav = get('.menu');
var icon = get('.toggle');

window.addEventListener('load', function(){
  function showNav() {
    if (topNav.className === 'menu') {
      topNav.className += ' responsive';
      icon.className += ' open';
    } else {
      topNav.className = 'menu';
      icon.classList.remove('open');
    }
  }
  icon.addEventListener('click', showNav);
});
