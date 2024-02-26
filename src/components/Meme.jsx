import { saveAs } from 'file-saver'
import { toPng } from 'html-to-image'
import { Image, Save } from 'lucide-react'
import { useEffect, useState } from 'react'

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  })
  const [allMemes, setAllMemes] = useState([])

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes))
  }, [])

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomNumber].url
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }))
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }))
  }

  const saveMeme = () => {
    const memeElement = document.getElementById('memeContainer')
    toPng(memeElement)
      .then((dataUrl) => {
        saveAs(dataUrl, 'meme.png')
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error)
      })
  }
  return (
    <section className="grid gap-y-5">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
      </div>
      <button onClick={getMemeImage}>
        <span>Get Random Image</span>
        <Image />
      </button>
      <div id="memeContainer" className="relative">
        <img src={meme.randomImage} className="rounded-xl max-w-full" />
        <p className="meme-text top-0">{meme.topText}</p>
        <p className="meme-text bottom-0">{meme.bottomText}</p>
      </div>
      <button onClick={saveMeme}>
        <span>Save Meme</span>
        <Save />
      </button>
    </section>
  )
}
export default Meme
