import { DisableMaterialData } from '../model/DisableMaterialData';


export const callAPI = async () => {
    try {
        const postbody = { version: 197 };
        const res = await fetch(`/main-main/routes.php/DisableMaterialData/getData/`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(postbody),
            },

        );
        const resdata = await res.json();
        //setTableData(resdata);

        return resdata;
    } catch (err) {
        console.log(err);
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
    },
    {
        id: '2',
        cas_no: '222-22-2,555-55-22',
        category: 'c2',
        name: 'name2',
        name_cn: '名稱2',
        ppm_limit: '1500',
        suitable_for: 'ACER',
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
