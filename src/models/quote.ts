type Quote = QuoteInput & {id : string}

export type QuoteInput = {
    text: string,
    author: string
}


export default Quote;