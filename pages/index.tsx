import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { ChangeEvent, useEffect, useState } from "react"
import { jsPDF } from "jspdf"
import Preload from "../components/Preload"
import Sidebar from "../components/Sidebar"

import { zero, imgData, imgData2 } from "../data"

const storageName = '@memino:'
const views = ['meta1', 'meta2', 'meta3', 'meta4', 'meme1', 'meme2', 'meme3', 'meme4']

const Home: NextPage = () => {
  const router = useRouter()

  const [storage, setStorage] = useState<any>()
  const [showPreload, setShowPreload] = useState(true)
  const [showSidebar, setShowSidebar] = useState(true)
  const [metaphor, setMetaphor] = useState('')
  const [meme, setMeme] = useState('')
  const [error, setError] = useState<string | undefined>()
  const [view, setView] = useState("meta1")
  const [text, setText] = useState("Metáfora 1")
  const [menu, setMenu] = useState("meta")
  const [content, setContent] = useState(['', '', '', '', 'nada.png', 'nada.png', 'nada.png', 'nada.png'])

  const togglePreload = () => setShowPreload((prevState) => !prevState)

  const toggleSidebar = () => setShowSidebar((prevState) => !prevState)

  const clearStorage = () => {
    storage?.clear()
    router.reload()
  }

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget
    setMetaphor(value)
    storage.setItem(`${storageName}${view}`, value)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileToUpload = event.target.files?.item(0)
    const reader = new FileReader()
    reader.onload = e => {
      const value = e.target?.result?.toString() || ''
      setMeme(value)
      storage.setItem(`${storageName}${view}`, value)
    }
    if(fileToUpload)
      reader.readAsDataURL(fileToUpload)
  }

  const verify = (data: any[]) => {
    let index = 0
    for(const element of data)  {
      if(!element) return index
      index++
    }
    return null
  }

  const handleSave = () => {
    if(storage) {
      const data = [
        storage.getItem(`${storageName}meta1`),
        storage.getItem(`${storageName}meta2`),
        storage.getItem(`${storageName}meta3`),
        storage.getItem(`${storageName}meta4`),
        storage.getItem(`${storageName}meme1`),
        storage.getItem(`${storageName}meme2`),
        storage.getItem(`${storageName}meme3`),
        storage.getItem(`${storageName}meme4`)
      ]
      const alert = verify(data)
      console.log("🚀 ~ file: index.tsx ~ line 70 ~ handleSave ~ alert", alert)
      if(typeof alert === 'number') {
        if (alert < 4)
          setError("O Campo da Metáfora " + (alert + 1) + " deve ser Preenchido!")
        else
          setError("A Imagem do Meme " + (alert - 3) + " deve ser Selecionada!")
        setMenu(views[alert].includes('meta') ? 'meta' : 'meme')
        setView(views[alert])
      } else {
        setError(undefined)
        var doc = new jsPDF('p', 'mm', 'a4', true)
        doc.setFontSize(10)

        // doc.text(35, 25, 'Paranyan loves jsPDF')
        doc.addImage(imgData, 'JPG', 20, 20, 170, 240, undefined, 'FAST')
        var top = 25
        for (let i = 0; i < 5; i ++)
        {
            doc.addImage(data[4], 'JPG', 25, top, 30, 30, undefined, 'FAST')
            if(i == 4)
            {
                doc.addImage(zero, 'PNG', 65, top, 30, 30, undefined, 'FAST')
            }
            else
            {
                var split = doc.splitTextToSize(data[i], 25)
                doc.text(split, 65 + 2, top+5, {"lineHeightFactor": 25})
            }
            top += 50
        }

        top = 25
        for (let i = 0; i < 5; i ++)
        {
            doc.addImage(data[5], 'JPG', 115, top, 30, 30, undefined, 'FAST')
            if(i == 4)
            {
                doc.addImage(zero, 'PNG', 155, top, 30, 30, undefined, 'FAST')
            }
            else
            {
                var split = doc.splitTextToSize(data[i], 25)
                doc.text(split, 155 + 2, top + 5)
            }
            top += 50
        }

        doc.addPage()
        doc.addImage(imgData, 'JPG', 20, 20, 170, 240, undefined, 'FAST')

        top = 25
        for (let i = 0; i < 5; i ++)
        {
            doc.addImage(data[6], 'JPG', 25, top, 30, 30, undefined, 'FAST')
            if(i == 4)
            {
                doc.addImage(zero, 'PNG', 65, top, 30, 30, undefined, 'FAST')
            }
            else
            {
                var split = doc.splitTextToSize(data[i], 25)
                doc.text(split, 65 + 2, top + 5)
            }
            top += 50
        }

        top = 25
        for (let i = 0; i < 5; i ++)
        {
            doc.addImage(data[7], 'JPG', 115, top, 30, 30, undefined, 'FAST')
            if(i == 4)
            {
                doc.addImage(zero, 'PNG', 155, top, 30, 30, undefined, 'FAST')
            }
            else
            {
                var split = doc.splitTextToSize(data[i], 25)
                doc.text(split, 155 + 2, top + 5)
            }
            top += 50
        }

        doc.addPage()
        doc.addImage(imgData2, 'PNG', 20, 20, 170, 240, undefined, 'FAST')

        top = 25
        for (let i = 0; i < 4; i ++)
        {
            var split = doc.splitTextToSize(data[i], 25)
            doc.text(split, 25 + 2, top + 5, split)
            doc.text(split, 65 + 2, top + 5)
            top += 50
        }

        top = 25
        for (let i = 0; i < 4; i ++)
        {
            var split = doc.splitTextToSize(data[i], 25)
            doc.text(split, 115 + 2, top + 5)
            doc.addImage(zero, 'PNG', 155, top, 30, 30, undefined, 'FAST')
            top += 50
        }
        doc.save('meminó.pdf')
      }
    }

  }

  useEffect((
  ) => {
    const title = view.includes('meta') ? 'Metáfora' : 'Meme'

    setText(`${title} ${view.slice(4, 5)}`)

    if(view.includes('meta') && storage){
      setMetaphor(storage.getItem(`${storageName}${view}`))
      setContent(prevState => prevState.map((element, index) => {
        if(index < 4) return storage.getItem(`${storageName}${view}`)
        return storage.getItem(`${storageName}${views[index]}`)
      }))
    }else
      setMetaphor('')

    if(view.includes('meme') && storage){
      setMeme(storage.getItem(`${storageName}${view}`))
      setContent(prevState => prevState.map((element, index) => {
        if(index < 4) return storage.getItem(`${storageName}${views[index]}`)
        return storage.getItem(`${storageName}${view}`)
      }))
    }else
      setMeme('nada.png')

  }, [storage, view])

  useEffect(() => {
    if (window) setStorage(window.localStorage)
  }, [])

  return (
    <>
      <Head>
        <title>Meminó</title>
      </Head>
      {showPreload && <Preload onClick={togglePreload} />}
      <div className={showSidebar ? "d-flex" : "d-flex toggled"} id="wrapper">
        <Sidebar menu={menu} setMenu={setMenu} view={view} setView={setView} onSave={handleSave}/>
        <div id="page-content-wrapper">
          <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div
              id="menu-toggle"
              className={showSidebar ? "icon times" : "icon"}
              onClick={toggleSidebar}
            >
              <div className="hanburger"></div>
            </div>
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <div className="user">
                  <a id="clear" href="#" onClick={clearStorage}>
                    Limpar projeto
                  </a>
                </div>
              </li>
            </ul>
          </nav>

          <div className="container-fluid">
            {error && <div id="alert" className="alert alert-danger">{error}</div>}
            <h3 id="title" className="mb-3">
              {text}
            </h3>
            <form
              action="api-url-here"
              method="post"
              encType="multipart/form-data"
            >
              {view.includes('meme') && (
                <input className="file-chooser" type="file" accept="image/*" onChange={handleInputChange}/>
              )}
              {view.includes('meta') && (
                <textarea
                  className="text"
                  placeholder="Digite aqui a Metáfora"
                  value={metaphor || ''}
                  onChange={handleTextAreaChange}
                />
              )}
            </form>

            <div className="row">
              <p className="w-100">Pre-visualisação das peças</p>
              <p className="w-100">
                Escolha imagens com proporção 1x1 para evitar distorções
              </p>
              {view.includes('meta') && (
                <div className="col-xl-6 meta-meta px-4">
                  <div className="row card-box meta1">
                    <div className="col card-block">
                      <h4>{storage?.getItem(`${storageName}${view}`) || ''}</h4>
                    </div>
                    <div className="col card-block">
                      <h4>{storage?.getItem(`${storageName}${view}`) || ''}</h4>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-xl-6 px-4">
                <div className="row card-box meta1">
                  <div className="col card-block">
                    <h4>{content[0]}</h4>
                  </div>
                  <div className="col card-footer">
                    <img src={content[4]} className="img-fluid preview-img1" />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 px-4">
                <div className="row card-box meta1">
                  <div className="col card-block">
                    <h4>{content[1]}</h4>
                  </div>
                  <div className="col card-footer">
                    <img src={content[5]} className="img-fluid preview-img1" />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 px-4">
                <div className="row card-box meta1">
                  <div className="col card-block ">
                    <h4>{content[2]}</h4>
                  </div>
                  <div className="col card-footer">
                    <img src={content[6]} className="img-fluid preview-img1" />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 px-4">
                <div className="row card-box meta1">
                  <div className="col card-block ">
                    <h4>{content[3]}</h4>
                  </div>
                  <div className="col card-footer">
                    <img src={content[7]} className="img-fluid preview-img1" />
                  </div>
                </div>
              </div>
              {view.includes('meme') && (
                <div className="col-xl-6  px-4 meme-zero">
                  <div className="row card-box meta1">
                    <div className="col card-block ">
                      <img src="Zero.svg" className="img-fluid" />
                    </div>
                    <div className="col card-footer">
                      <img src={meme || "nada.png"} className="img-fluid preview-img1" />
                    </div>
                  </div>
                </div>
              )}
              {view.includes('meta') && (
                <div className="col-xl-6 px-4 meta-zero">
                  <div className="row card-box meta1">
                    <div className="col card-block">
                      <h4>{metaphor || ''}</h4>
                    </div>
                    <div className="col card-footer">
                      <img src="Zero.svg" className="img-fluid" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
