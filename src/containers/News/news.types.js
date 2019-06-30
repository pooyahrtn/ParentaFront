export type State = {
    news: News[],
    refreshing: Boolean
}

// export type News = {
//     title: String,
//     description: String,
//     sender: String,
//     key: String,
//     timestamp: Date,
//     attachments?: {
//         title: String,
//         link: String,
//     }[],
//     buttons: {
//         text: String,
//         id: String,
//         background_color: String,
//         text_color: String,
//     }[],
// }

export type News = {
    uuid: String,
    title: String,
    date_created: String,
    feeder: {
        uuid: String,
        name: String,
    },
    body?: String,
    feed_attachments?: {
        uuid: String,
        file: String,
    }[],
}