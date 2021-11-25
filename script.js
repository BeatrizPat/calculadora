const calculadora = document.querySelector('.calculadora')
const teclas = document.querySelector('.teclas') /*seleciona a div que tem todas as teclas */
const visor = document.querySelector('.visor')

teclas.addEventListener('click', (evento) =>{ /*quando alguma tecla for clicada, recebe um evento */
    if(!evento.target.closest('button')) return//se o mais próximo do clique NAO(!) for um botao
    
        
    const tecla = evento.target
    const valorTecla = tecla.textContent 
    const {tipoTecla} = tecla.dataset
    const {tipoTeclaAnterior, memoria} = calculadora.dataset
    const valorVisor= visor.textContent

    if(tipoTecla === 'numero') {
        if(valorVisor === '0' || tipoTeclaAnterior == 'operador') { //começa com 0
            if(valorTecla === '00') {
                visor.textContent = '0'
            } else {
                visor.textContent = valorTecla //coloca valor da tecla no visor
            }
        } else { //concatena proximos digitos
            visor.textContent = valorVisor + valorTecla
        }
    }
    if(tipoTecla === 'operador') {
        const operadores = teclas.querySelectorAll('[data-tipo-tecla="operador"]')
        operadores.forEach((operador) => {
            operador.estado = '' //limpa marcaçao de selecionado
        })
        tecla.dataset.estado = 'selecionado' //marca como selecionado

        calculadora.dataset.primeiroNumero = valorVisor
        calculadora.dataset.operador = tecla.dataset.tecla
    }
    if(tipoTecla === 'igual') {
        const primeiroNumero = parseFloat(calculadora.dataset.primeiroNumero) //parseint pega o "texto" e transforma em numero
        const operador = calculadora.dataset.operador
        const segundoNumero = parseFloat(valorVisor)

        let resultado = ''

        if( operador == 'somar') {
            resultado = primeiroNumero+segundoNumero
        }
        if( operador == 'subtrair') {
            resultado = primeiroNumero-segundoNumero
        }
        if( operador == 'multiplicar') {
            resultado = primeiroNumero*segundoNumero
        }
        if( operador == 'dividir') {
            resultado = primeiroNumero/segundoNumero
        }
        visor.textContent = resultado
    }
    if(tipoTecla === 'limpar') { 
        visor.textContent = '0' 
    }
    if(tipoTecla === 'salvar') {
        calculadora.dataset.memoria = valorVisor//salva na "memoria" da calculadora
    }
    if(tipoTecla == 'recuperar') {
        if(memoria === undefined) {
            visor.textContent = '0'
        } else {
            visor.textContent = memoria
        }
    }
    
    calculadora.dataset.tipoTeclaAnterior = tipoTecla

}) 