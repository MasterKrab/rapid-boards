import urlRegex from 'url-regex'
import Filter from 'bad-words'

const regex = urlRegex({ exact: true, strict: false })

const removeUrls = (text) => text.replace(regex, '****')

const filter = new Filter({ replaceRegex: /[A-Za-z0-9가-힣_]/g })

export const detect = async (text) => {
  if (text.match(regex)) return 'cannot have links'

  return filter.isProfane(text) ? 'cannot have bad words' : null
}

// Add _ to the start to prevent an error when using emojis
export const cleanText = (text) => filter.clean(`_${removeUrls(text)}`).slice(1)
