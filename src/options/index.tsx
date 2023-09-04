import { useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

import styles from './index.module.css'

const OptionsIndex = () => {
  const [datas, setData] = useStorage<string[]>('saveDeta', [])
  const [dataInput, setDataInput] = useState('')

  const urlPattern =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

  const getDomain = (data: string) => {
    const domainPattern = /https?:\/\/[^/]+/
    const domain = data.match(domainPattern)
    return domain ? domain[0] : ''
  }

  const addData = async () => {
    if (urlPattern.test(dataInput)) {
      await setData([...datas, dataInput])
      setDataInput('')
    } else {
      alert('URLを入力してください')
    }
  }

  const removeData = (i: number) => {
    datas.splice(i - 1, 1)
    setData(datas)
  }

  return (
    <div>
      <div>
        <h1>除外サイト登録</h1>
        <input
          type="text"
          onChange={(e) => setDataInput(e.target.value)}
          value={dataInput}
        />
        <button onClick={addData}>データ追加</button>
      </div>
      <h2>登録済み一覧</h2>
      <div className={styles.urlListRow}>
        {datas.map((data, i) => (
          <div key={i}>
            <img src={`${getDomain(data)}/favicon.ico`} />
            <a href={data}>{data}</a>
            <button onClick={() => removeData(i)}>remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OptionsIndex
