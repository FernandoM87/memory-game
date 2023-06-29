import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCards'

const cardImages = [
  {"src": "/img/CSS.png", matched: false }, 
  {"src": "/img/HTML.png", matched: false}, 
  {"src": "/img/JavaScript.png", matched: false}, 
  {"src": "/img/React.png", matched: false}, 
  {"src": "/img/Vite.png", matched: false}
]

function App() {

  const [cards, setCards] = useState ([])
  const [turns, setTurns] =useState (0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  //Shuffle Cards

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id : Math.random() }))

      setCards(shuffleCards)
      setTurns(0)
  }

  //handle a choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  
  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo){

      if (choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card => { 
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          }) 
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  
  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
  }

  return (
    <div className="App">
        <h1>Memory Card Game</h1>
        <button onClick={shuffleCards}>Start</button>

        <div className="card-grid">
          {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card == choiceTwo || card.matched }
          />
          ))}
        </div>
      </div>
  ) 
      
    
}

export default App
