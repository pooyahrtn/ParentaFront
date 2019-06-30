import Container from '../../utils/StoreContainer';
import { State, News } from './news.types';
import { api } from '../../app';

// const news: News[] = [
//     {
//         title: 'کلاس پژوهش',
//         description: 'کلاس پنجشنبه برگزار نمیگردد',
//         sender: 'واحد پژوهش',
//         key: '1',
//         timestamp: new Date(),
//     },
//     {
//         title: 'سهمیه بندی بنزین',
//         description: 'سمت نمایندگی قائم به شخص است و قابل واگذاری به دیگری نیست. مجلس نمی‌تواند اختیار قانونگذاری را به شخص یا هیأتی واگذار کند ولی در موارد ضروری می‌تواند اختیار وضع بعضی از قوانین را با رعایت اصل هفتاد و دوم به کمیسیون‌های داخلی خود تفویض کند، در این صورت این قوانین در مدتی که مجلس تعیین می‌نماید به صورت آزمایشی اجرا می‌شود و تصویب نهایی آنها با مجلس خواهد بود. همینین مجلس شورای اسلامی می‌تواند تصویب دائمی اساسنامه سازمانها، شرکتها، موُسسات دولتی یا وابسته به دولت را با رعایت اصل هفتاد و دوم به کمیسیونهای ذیربط واگذار کند و یا اجازه تصویب آنها را به دولت بدهد. در این صورت مصوبات دولت نباید با اصول و احکام مذهب رسمی کشور و یا قانون اساسی مغایرت داشته باشد، تشخیص این امر به ترتیب مذکور در اصل نود\n www.google.com و ششم با شورای نگهبان است. علاوه بر این، مصوبات دولت نباید مخالفت قوانین و مقررات عمومی کشور باشد و به منظور بررسی و اعلام عدم 09124594688 آنها با قوانین مزبور باید ضمن ابلاغ برای اجرا به اطلاع رئیس مجلس شورای اسلامی برسد. ',
//         sender: 'واحد بنزین',
//         key: '2',
//         timestamp: new Date(),
//         attachments: [
//             {
//                 title: 'عکس',
//                 link: 'https://wallpaperplay.com/walls/full/e/0/1/102440.jpg',
//             },
//             {
//                 title: 'فایل جزوه',
//                 link: 'http://www.africau.edu/images/default/sample.pdf',
//             },
//             {
//                 title: 'فایل جزوه',
//                 link: 'http://www.africau.edu/images/default/sample.pdf',
//             }
//         ],
//         buttons: [
//             { text: 'تایید', id: '0', text_color: 'white', background_color: 'blue' },
//             { text: 'مخالفت', id: '1', text_color: 'white', background_color: 'red' },
//         ]
//     },
//     {
//         title: 'سهمیه بندی بنزین',
//         description: 'سمت نمایندگی قائم به شخص است و قابل واگذاری به دیگری نیست. مجلس نمی‌تواند اختیار قانونگذاری را به شخص یا هیأتی واگذار کند ولی در موارد ضروری می‌تواند اختیار وضع بعضی از قوانین را با رعایت اصل هفتاد و دوم به کمیسیون‌های داخلی خود تفویض کند، در این صورت این قوانین در مدتی که مجلس تعیین می‌نماید به صورت آزمایشی اجرا می‌شود و تصویب نهایی آنها با مجلس خواهد بود. همینین مجلس شورای اسلامی می‌تواند تصویب دائمی اساسنامه سازمانها، شرکتها، موُسسات دولتی یا وابسته به دولت را با رعایت اصل هفتاد و دوم به کمیسیونهای ذیربط واگذار کند و یا اجازه تصویب آنها را به دولت بدهد. در این صورت مصوبات دولت نباید با اصول و احکام مذهب رسمی کشور و یا قانون اساسی مغایرت داشته باشد، تشخیص این امر به ترتیب مذکور در اصل نود\n www.google.com و ششم با شورای نگهبان است. علاوه بر این، مصوبات دولت نباید مخالفت قوانین و مقررات عمومی کشور باشد و به منظور بررسی و اعلام عدم 09124594688 آنها با قوانین مزبور باید ضمن ابلاغ برای اجرا به اطلاع رئیس مجلس شورای اسلامی برسد. ',
//         sender: 'واحد بنزین',
//         key: '3',
//         timestamp: new Date(),
//         attachments: [
//             {
//                 title: 'عکس',
//                 link: 'https://wallpaperplay.com/walls/full/e/0/1/102440.jpg',
//             },
//             {
//                 title: 'فایل جزوه',
//                 link: 'http://www.africau.edu/images/default/sample.pdf',
//             },
//             {
//                 title: 'فایل جزوه',
//                 link: 'http://www.africau.edu/images/default/sample.pdf',
//             }
//         ],
//         buttons: [
//             { text: 'تایید', id: '0', text_color: 'white', background_color: 'blue' },
//             { text: 'مخالفت', id: '1', text_color: 'white', background_color: 'red' },
//         ]
//     },

// ];

export default class NewsContainer extends Container<State> {
    state: State = {
        news: [],
        refreshing: false,
    }

    refreshNews = async () => {
        await this.setState({
            refreshing: true,
        })
        const res = await api.get('feeds/get/all/');
        await this.setState({
            refreshing: false,
        });
        if (res.ok) {
            await this.setState({
                news: res.data
            });
        }
    }
    getNewsDetail = async (uuid: String) => {
        const res = await api.get(`feeds/get/${uuid}/`);
        const { ok, data } = res;
        return {
            ok,
            data
        }
    }
}