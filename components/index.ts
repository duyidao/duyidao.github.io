const list = import.meta.glob('./*.vue', { eager: true })

export default (app) => {
  Object.keys(list).forEach((item) => {
    const name = item.split('.')[1].replace('/', '')
    app.component(name, list[item].default)
  })
}
