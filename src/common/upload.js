/**
 * Created by abc on 2018/7/31.
 */
let downloadHandler = (content, filename) => {
  console.log(content)
  let eleLink = document.createElement('a')
  eleLink.download = filename
  eleLink.style.display = 'none'
  let blob = new Blob([content], {type: 'application/octet-stream'})
  eleLink.href = URL.createObjectURL(blob)
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}
export default { downloadHandler }
