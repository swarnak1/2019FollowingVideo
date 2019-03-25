export default function () {
  return {
    Auth: require('./auth').default(...arguments),
    reqParser: require('./reqParser').default(...arguments),
  }
}