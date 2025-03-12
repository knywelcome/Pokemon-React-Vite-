import{ useState } from "react";
import { useEffect } from "react";
import './App.css'
import axios from "axios";
// import './trainers.json'


  function App() {
    const[professorPokemon, setProfessorPokemon] = useState(null)

    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    }



    const getMon = async(num) => {
      const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon/'+num);
      //console.log(respond)
      //const data =  respond.json();
      // const myImg = data.sprites.front_default;
      // return myImg;
      // console.log(data)

      //setProfessorPokemon(data)
      return data
    }

    const getRestOfTheTeam = async(myType,team) => {
      let key = true
      while(key){
          if (team.length == 6){
              key = false
          }else{
              const num = getRandomInt(1, 900);
              const Pokemon = await getMon(num);          //?????????????
              // console.log(Pokemon)
              // console.log(Pokemon.types[0].type.name);
              // team.push(Pokemon)
              if(Pokemon.types[0].type.name == myType){
                team.push(Pokemon)
              }
          }  
      }
      return team
    }

    const makeTheHTML = (team) => {
      let numOfSize = 0
      for (const pokemon of team) {
          numOfSize += 5
          const name = pokemon.name;
          const back = pokemon.sprites.other.showdown.back_default;
          const front = pokemon.sprites.other.showdown.front_default;
          
          // const img2 = document.createElement('img');
          // img2.src = back;
          // document.body.appendChild(img2);
  
          const img = document.createElement('img');
          img.src = front;
          img.setAttribute('style', 'position: relative', 'top: 0px;')
          //img.style.position = "absolute"
          img.style.top = numOfSize+"px";

          
          // console.log(img)
          // field= document.getElementById("battlefield")
          // document.field.appendChild(img);
          
          const otherTeam = document.getElementsByClassName("enemy_team")[0]
          //console.log(otherTeam)
          otherTeam.appendChild(img);
        }
  
      }


    const professorOakPokemon = async() => {
      const randomNum = getRandomInt(1, 900);
      const myPokemon =  await getMon(randomNum);
      const poke= await myPokemon;
      
      return poke.sprites.other.showdown.front_default
    }



    const getPokemonTeam = async() => {
      let pokeTeamV1 = []                            // the pokemon team
      const randomNum = getRandomInt(1, 151);   // gets a random number
      const myPokemon = await getMon(randomNum);   // gets a random pokemon (first)
      const themeType = myPokemon.types[0].type.name // gets the pokemon's type
      //console.log(themeType)
      pokeTeamV1.push(myPokemon)                       // adding the Big-Ass json
      // console.log(pokeTeamV1)

      const pokeTeamDone = await getRestOfTheTeam(themeType,pokeTeamV1)           // run a while till a pokemon == type, add the list, until length is 6
      //       ^^ my full type pokemon  list
      makeTheHTML(pokeTeamDone)
    }


    // const unF_this = async() => {
    //   let poke = []
    //   async() => {
    //     poke.push(await getMon(1))
    
    //   }
    //   return await poke

    // }
    // const randomPokemon = []

    const preGetThePokemon = async() => {
      // const randomPokemon = professorOakPokemon()
      const myPokemon = await getMon(3)
      console.log("fu")
      setProfessorPokemon(myPokemon)

      // const thePokemon = professorOakPokemon()
      // console.log(thePokemon)
      // randomPokemon.push(thePokemon)
    }


    const [pageNum, setPageNum] = useState(0)
    // const [randomPokemon, setRandomPokemon] = useState(null)

    useEffect(() => {
      // let p =  getMon(1)
      // console.log(p)
      preGetThePokemon()
      console.log(professorPokemon)

      //setRandomPokemon(async() => {randomPokemon = await professorOakPokemon()})
    },[])









    // let pageOfStory = 0
    const story = async() => {
      // pageOfStory += 1
      setPageNum(pageNum+1)

      const topScreen = document.getElementsByClassName("top_screen")[0]
      const bottomScreen = document.getElementsByClassName("bottom_screen")[0]
      const textBox = document.getElementsByClassName("textBox")[0]
      const textBoxText = document.getElementsByClassName("textBoxText")[0]
      const proOaksPokemon = document.getElementsByClassName("proOaksPokemon")[0]
      
      if (pageNum == 1){
        topScreen.style.backgroundImage = "url(https://i.gifer.com/8BQR.gif)"
          
      }else if(pageNum == 2 ){
        
        topScreen.style.backgroundImage = "url(data:image/png;base64,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)"
        const textBox = document.createElement("div")
        const textBoxText = document.createElement("p")

        textBox.classList.add("textBox")
        textBoxText.classList.add("textBoxText")
        textBoxText.innerHTML = "Hello new trainer welcome to the world of Pokemon..."

        textBox.appendChild(textBoxText)
        bottomScreen.appendChild(textBox)

      }else if(pageNum == 3 ){
        textBoxText.innerHTML = "I'm name is Professor Oak, the Pokemon Professor.."

      }else if(pageNum == 4 ){
        textBoxText.innerHTML = "This is a Pokemon..."

        const randomPokemon = await professorOakPokemon() //I had to make the whole function async because this one don't mind
      
        const proOaksPokemon = document.createElement("img")
        proOaksPokemon.src = randomPokemon
        //proOaksPokemon.classList.add("textBoxText")
        proOaksPokemon.classList.add("proOaksPokemon")
        topScreen.appendChild(proOaksPokemon)

      }else if(pageNum == 5 ){
        textBoxText.innerHTML = "Beautiful creatures we call exist with..."

      }else if(pageNum == 6 ){
        topScreen.removeChild(proOaksPokemon)
        textBoxText.innerHTML = "What's your name?..."

        
      }else if(pageNum == 7 ){
        bottomScreen.removeChild(textBox)
        const nameBox = document.createElement("input")

//https://www.youtube.com/watch?v=Ls2ynrMv10A

      }else if(pageNum == 9 ){
        
        topScreen.style.backgroundImage = "url(https://pm1.aminoapps.com/5966/79118e9da6944c0c3ddbdcf132b2e7131e38d387_hq.jpg)"
        getPokemonTeam()
      }
      
    }




    // const a_button = document.getElementsByClassName('a_button')[0];
    // a_button.addEventListener('click', getPokemonTeam);


    


  return (
    <>
      <div className="ds">
        <div className="top_screen">
          <div className="enemy_team">

          </div>
          <div className="my_team">

          </div>
        </div>
        <div className="bottom_screen">
          {/* <div className="textBox">
            <p className="textBoxText">Hello trainer</p>

          </div> */}

        </div>
        <div className="buttons">
          <div className="a_button" onClick={(e) => story(e)}></div>

          </div>
      </div>
    </>
  )
}

export default App
