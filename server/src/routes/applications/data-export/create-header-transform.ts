import stream from 'node:stream'

export class CreateMLHHeaderTransform extends stream.Transform {
  private headersAdded: boolean;

  constructor() {
    super({
      writableObjectMode: false, // the stream expects to receive a string
      readableObjectMode: false // the stream expects its _transform implementation to push a string
    })
    this.headersAdded = false
  }

_transform(chunk: string, encoding: never, callback: stream.TransformCallback): void {
    if(!this.headersAdded) {
      this.headersAdded = true
      callback(null,("First names,Last names,Email,Phone number,Age,School,Country of residence,Current level of study,Attendance\r"+chunk))
    } else
      callback(null,chunk)
}
}

export class CreateHUKHeaderTransform extends stream.Transform {
  private headersAdded: boolean;

  constructor() {
    super({
      writableObjectMode: false, // the stream expects to receive a string
      readableObjectMode: false // the stream expects its _transform implementation to push a string
    })
    this.headersAdded = false
  }

_transform(chunk: string, encoding: never, callback: stream.TransformCallback): void {
    if(!this.headersAdded) {
      this.headersAdded = true
      callback(null,("First names,Last names,Email,Phone number,Academic institution,Graduation year,Ethnicity,Gender,Attendance,\r"+chunk))
    } else
      callback(null,chunk)
}
}
