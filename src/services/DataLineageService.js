import _ from 'lodash'

const BASE_URL = `${process.env.URL}/data-lineage`
const jwt = JSON.parse(localStorage.getItem('jwt') || '{}')
const options = { credentials: true }

if (!_.isEmpty(jwt)) {
  options.headers = { 'Authorization': jwt.token }
}

const schemasUrl = (source) => `${BASE_URL}/${source}/schemas`
const schemaUrl = (source, schema) => `${BASE_URL}/${source}/${schema}`

const updateTableCommentUrl = (source, schema, table) => {
  return `${BASE_URL}/${source}/${schema}/${table}`
}

const get = (http, endpoint) => http.get(endpoint, options)

export default class DataLineageService {
  constructor (http, source) {
    this.http = http
    this.source = source
    this.schemasUrl = schemasUrl(this.source)
    this.schemaUrl = schemaUrl(this.source, this.schema)
  }

  getSchemas = () => get(this.http, schemasUrl(this.source))
  getSchema = (schema) => get(this.http, schemaUrl(this.source, schema))

  updateTableComment = (schema, table, comment) => {
    const data = { comment: comment }

    return this.http.put(
      updateTableCommentUrl(this.source, schema, table),
      data,
      options
    )
  }
}
