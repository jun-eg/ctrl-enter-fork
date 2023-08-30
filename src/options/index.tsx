import { useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

const OptionsIndex = () => {
  const [datas, setData] = useStorage<string[]>('saveDeta', [])
  const [dataInput, setDataInput] = useState('')

  const urlPattern =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

  const addData = async () => {
    if (urlPattern.test(dataInput)) {
      await setData([...datas, dataInput])
      setDataInput('')
    } else {
      alert('URLを入力してください')
    }
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
      <div>
        {datas.map((data, i) => (
          <div key={i}>{data}</div>
        ))}
      </div>
    </div>
  )
}

export default OptionsIndex
