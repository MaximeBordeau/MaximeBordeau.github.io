

const boutonMenu = document.querySelector(".bouton-menu")
const navbar = document.querySelector(".navbar")
const blocsMenu = document.querySelector(".blocs-menu")
const boutonConteneur = document.querySelector(".bouton-conteneur")

boutonMenu.addEventListener("click", () => {
    boutonConteneur.classList.toggle("active")
    navbar.classList.toggle("menu-visible")
})

if(window.matchMedia('(max-width: 1300px)')) {

    
        blocsMenu.addEventListener('click', () => {
            navbar.classList.toggle('menu-visible')
            boutonConteneur.classList.toggle('active');    
        })
}

// Anim GSAP + ScrollMagic

const TL1 = gsap.timeline({paused: false});

TL1 
gsap.from('#titre-hero', {y: -50, opacity: 0, ease: 'power2.inOut', duration: 1, delay:0})
gsap.to(".navbar", {opacity:1, ease: Power1.easeOut, duration: 1, delay: 2,})

gsap.from('.scroll-animation-container', {opacity: 0, ease: 'power2.inOut', duration: 1, delay:10})


window.addEventListener('load', () => {
    TL1.play();
})

// Animation écriture accueil

const texteAnimation = document.querySelector(".texte-animation");

let typewriter = new Typewriter(texteAnimation, {
    loop:false,
    deleteSpeed: 25,
})

typewriter
.pauseFor(1000)
.changeDelay(35)
.typeString('Développeur Web Junior')
.pauseFor(1000)
.deleteChars(10)
.typeString ('<span class="span-txt-animation"> HTML</span>')
.pauseFor(1000)
.deleteChars(4)
.typeString ('<span class="span-txt-animation"> CSS</span>')
.pauseFor(1000)
.deleteChars(3)
.typeString ('<span class="span-txt-animation"> JavaScript</span>')
.pauseFor(1000)
.deleteChars(10)
.typeString('<strong> passioné</strong>')
.typeString(' !')
.start()


// Animation compétences

const sectionCompetences = document.querySelector('.section-competences')
const containerCompetences = document.querySelector('.container-competences')

const titreCompetences = document.querySelector('.titre-competences');

const panelCompetencesA = document.querySelector('#panel-competences-A')
const panelCompetencesB = document.querySelector('#panel-competences-B')
const panelCompetencesC = document.querySelector('#panel-competences-C')


const tlCompetences = new TimelineMax();

tlCompetences
.from(titreCompetences, { opacity: -5, duration: 0.5})
.from(panelCompetencesA, {y: 50, opacity: 0, duration: 0.5},'+=0.1')


.from(panelCompetencesB, {y: 50, opacity: 0, duration: 0.6},'+=0.1')
.from(panelCompetencesC, {y: 50, opacity: 0, duration: 0.7},'+=0.1')


const controller = new ScrollMagic.Controller();

const scene1 = new ScrollMagic.Scene({
    triggerElement: sectionCompetences,
    triggerHook: 0.5,
    reverse: false
})

.setTween(tlCompetences)
// .addIndicators()
.addTo(controller)





// Anim portfolio

const portfolioContainer = document.querySelector('.portfolio')
const titrePortfolio = document.querySelector('.titre-port')
const itemPortfolio = document.querySelectorAll('.vague1')

const tlPortfolio = new TimelineMax();

tlPortfolio
.from(titrePortfolio, {y: -50, opacity: 0, duration: 0.5})
.staggerFrom(itemPortfolio, 1, {opacity: 0}, 0.2, '-=0.5')

const scene2 = new ScrollMagic.Scene({
    triggerElement: portfolioContainer,
    triggerHook: 0.5,
    reverse: false
})
.setTween(tlPortfolio)
// .addIndicators()
.addTo(controller)


// Vague 2 

const itemPortfolio2 = document.querySelectorAll('.vague2')

const tlPortfolio2 = new TimelineMax();

tlPortfolio2
.staggerFrom(itemPortfolio2, 1, {opacity: 0}, 0.2, '-=0.5')

const scene3 = new ScrollMagic.Scene({
    triggerElement: itemPortfolio,
    triggerHook: 0.2,
    reverse: false
})
.setTween(tlPortfolio2)
// .addIndicators()
.addTo(controller)


// Vague 3

const itemPortfolio3 = document.querySelectorAll('.vague3')

const tlPortfolio3 = new TimelineMax();

tlPortfolio3
.staggerFrom(itemPortfolio3, 1, {opacity: 0}, 0.2, '-=0.5')

const scene4 = new ScrollMagic.Scene({
    triggerElement: itemPortfolio2,
    triggerHook: 0.2,
    reverse: false
})
.setTween(tlPortfolio3)
// .addIndicators()
.addTo(controller)



// Animation Contact




// Animation Compétences

// const sectionComp = document.querySelector('.section-comp');
// const titreComp = document.querySelector('.titre-comp');
// const allLabel = document.querySelectorAll('.label-skill')
// const allPourcent = document.querySelectorAll('.number-skill')
// const allBarres = document.querySelectorAll('.barre-skill')
// const allShadowBarres = document.querySelectorAll('.barre-grises')
// const squares = document.querySelector('.squares')

// const tlCompetences = new TimelineMax();

// tlCompetences
// .from(titreComp, {opacity: 0, duration: 1})
// .staggerFrom(allLabel, 0.5, {y: -50, opacity:0}, 0.1, '-=0.5')
// .staggerFrom(allPourcent, 0.5, {y: -10, opacity:0}, 0.1, '-=1')
// .staggerFrom(allShadowBarres, 0.5, {y: -10, opacity:0}, 0.1, '-=1')
// .staggerFrom(allBarres, 0.5, {y: -10, opacity:0}, 0.1, '-=1')
// .staggerFrom(squares, 0.7, {opacity:0, duration:1}, 0.1, '-=1')


// const scene5 = new ScrollMagic.Scene({
//     triggerElement: sectionComp,
//     reverse: false
// })
// .setTween(tlCompetences)
// .addTo(controller);
