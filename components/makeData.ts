import { DisableMaterialData } from '../model/DisableMaterialData';


export const callAPI = async (offset = 0, limit = 10) => { // 設定預設值方便使用
    try {
        // 將 offset 和 limit 包含在 postbody 中
        const postbody = {
            //version: 197, // 您現有的參數
            offset: offset, // 新增的參數：從哪裡開始
            limit: limit    // 新增的參數：每次取多少
        };

        const res = await fetch(`/main-main/routes.php/DisableMaterialData/getDataTK/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(postbody),
            },
        );

        if (!res.ok) { // 檢查 HTTP 響應是否成功
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const resdata = await res.json();
        console.log("Fetched data:", resdata); // 更明確的日誌
        return resdata;
    } catch (err) {
        console.error("Error in callAPI:", err); // 使用 console.error 記錄錯誤
        // 根據需求，這裡可以拋出錯誤或返回空陣列
        return [];
    }
};
// export const data = async () => {

//     const d: DisableMaterialData[] = [];
//     return d;
// }
export const data: DisableMaterialData[] = [
    {
        id: '1',
        cas_no: '111-11-1',
        category: 'c1',
        name: 'name1',
        name_cn: '名稱1',
        ppm_limit: '1000',
        suitable_for: 'ASUS',
        branch: 'KT',
    },
    {
        id: '2',
        cas_no: '222-22-2,555-55-22',
        category: 'c2',
        name: 'name2',
        name_cn: '名稱2',
        ppm_limit: '1500',
        suitable_for: 'ACER',
        branch:'VN'
    },

];

//50 us ppm_limits array
export const ppm_limits = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
    'Puerto Rico',
];
