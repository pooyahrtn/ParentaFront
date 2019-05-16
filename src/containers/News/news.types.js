export type State = {
    news: News[],
}

export type News = {
    title: String,
    description: String,
    sender: String,
    key: String,
    timestamp: Date,
    attachments?: {
        title: String,
        link: String,
    }[],
    buttons: {
        text: String,
        id: String,
        background_color: String,
        text_color: String,
    }[],
}
