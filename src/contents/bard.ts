import type { PlasmoCSConfig } from 'plasmo'
import { getConfig } from 'src/utils/config'
import { key } from 'src/utils/key'

export const config: PlasmoCSConfig = {
  matches: ['https://bard.google.com/*'],
  all_frames: true
}

const isTextArea = (e: KeyboardEvent) => {
  const target = e.target as HTMLElement
  return target.tagName === 'TEXTAREA'
}

const sendButton = (elm: HTMLElement) =>
  elm.parentElement?.parentElement?.parentElement?.parentElement?.nextElementSibling?.getElementsByTagName(
    'button'
  )[0]

document.addEventListener(
  'keydown',
  async (e) => {
    const config = await getConfig()
    const bardConfig = config.bard

    if (bardConfig) {
      if (isTextArea(e)) {
        if (key(e) === 'enter') {
          e.stopPropagation()
        } else if (key(e) === 'ctrlEnter') {
          sendButton(e.target as HTMLElement)?.click()
        }
      }
    }
  },
  { capture: true }
)
