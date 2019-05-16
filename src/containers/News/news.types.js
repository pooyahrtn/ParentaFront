export type State = {
    news: News[],
}

export type News = {
    title: String,
    description: String,
    sender: String,
    key: String,
    timestamp: Date,
}
