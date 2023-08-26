import { useState } from 'react'

import { useStorage } from '@plasmohq/storage/hook'

const OptionsIndex = () => {
  const [data, setData] = useStorage<string[]>('saveDeta', [])

  const addData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await setData([...data, e.target.value])
  }
  return (
    <div>
      <h1>除外サイト登録</h1>
      <input onChange={(e) => addData(e)} value={data} />
    </div>
  )
}
export default OptionsIndex
