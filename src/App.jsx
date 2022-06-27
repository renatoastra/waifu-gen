import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import { nsfwOptions, sfwOptions } from './services/data';
import logo from './assets/02.png';
import * as IconFa from 'react-icons/fa';
import * as IconAi from 'react-icons/ai';


function App() {
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [link, setLink] = useState('');
  const [selectedType, setSelectedType] = useState(false);
  const [amount, setAmount] = useState(1);
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    setType('sfw');
    setSelectedType(sfwOptions);
    setCategory('waifu');
    setAmount('1');
  }, []);


  function getResponse() {
    setLoading(false);
    if (type.length < 1 || category.length < 1) {
      return alert('Selecione todos os campos');
    }

    if (type == "nsfw") {

      if (!confirm('O conteúdo é 18+ deseja continuar ?')) {
        return window.location.href = "https://twitter.com/DragaoDeKomodo2";
      }
    }

    if (amount > 1) {
      axios.post('https://api.waifu.pics/many/' + type + "/" + category, { type, category }).then((response) => {
        setLink(response.data.files);
        setLoading(true);
      })
    } else {
      axios.get('https://api.waifu.pics/' + type + "/" + category, { type, category }).then((response) => {
        setLink(response.data.url);
        setLoading(true);
      })
    }
  }

  function handleChange(e) {
    setType(e.target.value);
    if (e.target.value == "nsfw") {

      setSelectedType(nsfwOptions);
    }

    if (e.target.value == "sfw") {
      setSelectedType(sfwOptions);
      setCategory('waifu');


    }
  }

  function changeTheme() {
    document.documentElement.style.setProperty('--background-color', '#fff');
    if (!theme) {
      document.documentElement.style.setProperty('--background-color', '#121212');
    }
    setTheme((tema) => !tema);
  }

  return (
    <>
      <div className={theme ? 'wrapper night' : 'wrapper light'}>
        <nav>
          <ul>
            <a href='https://twitter.com/AstraSlade' target='_blank'><li><IconAi.AiFillTwitterCircle /></li></a>
            <a href='https://github.com/renatoastra' target='_blank'><li><IconAi.AiFillGithub /></li></a>
            <li onClick={changeTheme}> {theme ? <IconFa.FaLightbulb className='icon' /> : <IconFa.FaRegLightbulb className='icon' />}  </li>
          </ul>
        </nav>
        <header>
          <div className="headerWrapper">
            <h1>Waifu Gen</h1>
            <a href='https://www.google.com/search?q=zero+two+best+waifu&oq=zero+two+best+waifu' target="_blank"><img src={logo} alt="Zero two best waifu" /></a>
          </div>
        </header>
        <div className="inputArea">

          <select value={type} id="type" onChange={handleChange} >
            <option value="sfw">SFW</option>
            <option value="nsfw">NSFW</option>
          </select>

          <select value={amount} id="amount" onChange={(e) => setAmount(e.target.value)} >
            <option value="1">just one waifu</option>
            <option value="2">moar!!!</option>
          </select>

          <select value={category} id="category" onChange={(e) => setCategory(e.target.value)} >
            {typeof selectedType == 'object' ? selectedType.map((newType, index) => {

              return (
                <option selected id={index} value={newType}>{newType == "trap" ? "trans" : newType}</option>

              )
            }) : "carregando.."}
          </select>

          <button onClick={getResponse}> Gerar waifu </button>

        </div>
        <div className="imgWrapper">

          <div className={typeof link == 'object' ? "manyImages" : "singleImage"}>
            {typeof link == 'object' ? link.map((item, index) => {

              return (
                loading ?
                  <a href={item} target="_blank"><img src={item} /></a>

                  : 'carregando ( ͡° ͜ʖ ͡°)'

              )
            }) :

              <a href={link} target="_blank"><img src={link} /></a>

            }
          </div>
        </div>
      </div>

    </>
  )
}

export default App
