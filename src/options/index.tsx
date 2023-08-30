import { useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

const OptionsIndex = () => {
  const [datas, setData] = useStorage<string[]>('saveDeta', [])
  const [dataInput, setDataInput] = useState('')

  const addData = async () => {
    if (dataInput) {
      await setData([...datas, dataInput])
      setDataInput('') // インプットをクリア
    }
  }

  return (
    <div>
      <div>
        <h1>除外サイト登録</h1>
        <input
          onChange={(e) => setDataInput(e.target.value)}
          value={dataInput}
        />
        <button onClick={addData}>データ追加</button>
      </div>
      <div>
        {datas.map((data, i) => (
          <div key={i}>{data}</div>
        ))}
      </div>
    </div>
  )
}

export default OptionsIndex
