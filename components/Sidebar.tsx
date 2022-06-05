interface Props {
  view: string
  menu: string
  setView: (value: string) => void
  setMenu: (value: string) => void
  onSave: () => void
}

function Sidebar ({ menu, setMenu, view, setView, onSave}: Props) {

  const handleChangeView = (event: any) => {
    setView(event.currentTarget.id)
  }

  const handleChangeMenu =  (value: string) => (event: any) => {
    setMenu(value)
  }

  return (
    <div className="bg-dark" id="sidebar-wrapper">
      <div className="sidebar-heading">Meminó </div>
      <div className="sidebar list-group list-group-flush">
        <ul>
          <li className={menu === 'meta' ? 'item active' : 'item'} id="item2">
            <a href="#" className="btn" onClick={handleChangeMenu('meta')}>
              Metáforas
              <i className="arrow fas fa-chevron-right"></i>
            </a>
            <div className={menu === 'meta' ? 'smenu active' : 'smenu'}>
              <a id='meta1' className={view === 'meta1' ? 'active' : ''} href="#" onClick={handleChangeView}>Metáfora 1</a>
              <a id='meta2' className={view === 'meta2' ? 'active' : ''} href="#" onClick={handleChangeView}>Metáfora 2</a>
              <a id='meta3' className={view === 'meta3' ? 'active' : ''}  href="#" onClick={handleChangeView}>Metáfora 3</a>
              <a id='meta4' className={view === 'meta4' ? 'active' : ''}  href="#" onClick={handleChangeView}>Metáfora 4</a>
            </div>
          </li>
          <li className={menu === 'meme' ? 'item active' : 'item'} id="item3">
            <a href="#" className="btn" onClick={handleChangeMenu('meme')}>
              Memes
              <i className="arrow fas fa-chevron-right"></i>
            </a>
            <div className={menu === 'meme' ? 'smenu active' : 'smenu'}>
              <a id='meme1' className={view === 'meme1' ? 'active' : ''} href="#" onClick={handleChangeView}>Meme 1</a>
              <a id='meme2' className={view === 'meme2' ? 'active' : ''} href="#" onClick={handleChangeView}>Meme 2</a>
              <a id='meme3' className={view === 'meme3' ? 'active' : ''} href="#" onClick={handleChangeView}>Meme 3</a>
              <a id='meme4' className={view === 'meme4' ? 'active' : ''} href="#" onClick={handleChangeView}>Meme 4</a>
            </div>
          </li>
          <li className="item" id="item4">
            <a id="genPDF" href="#" className="btn" onClick={onSave}>
              Salvar PDF
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
