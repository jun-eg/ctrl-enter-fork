import { useEffect, useState } from 'react'
import { addExcludes, getExcludes } from 'src/utils/excludes'

import styles from './index.module.css'

const OptionsIndex = () => {
  const [excludes, setExcludes] = useState<string[]>([])
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
      addExcludes(dataInput)
      setDataInput('')
    } else {
      alert('URLを入力してください')
    }
  }

  const removeData = (i: number) => {
    excludes.splice(i - 1, 1)
    setExcludes(excludes)
  }

  // useEffect(() => {
  //   const fetchExcludes = async () => {
  //     const excludes = await getExcludes()
  //     setExcludes(excludes)
  //     console.log(excludes)
  //   }

  //   fetchExcludes()

  //   const fetchExcludesInterval = setInterval(fetchExcludes, 1000)

  //   return () => {
  //     clearInterval(fetchExcludesInterval)
  //   }
  // }, [])

  return (
    <div>
      <div>
        <h1>除外サイト登録</h1>
        <input
          type="text"
          onChange={(e) => setDataInput(e.target.value)}
          value={dataInput}
        />
        <button onClick={() => addExcludes(dataInput)}>データ追加</button>
      </div>

      <div className={styles.urlListRow}>
        <h2>登録済み一覧</h2>
        {excludes.map((data, i) => (
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
