
async function fetchData(search_key,sort_key) {
    return fetch(`https://k8bto0c6d5.execute-api.ap-northeast-1.amazonaws.com/prototype/owner?id=` + search_key,
    {  mode: 'cors'  })
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        return myJson.items
    });
}

// Dynamo の JSON から内部用 JSON リストに成形
// 【TODO】APIができたので、もう用無し
function modeling(data){
    var items = data.L
    //  ラムダ側で以下の処理を済ませておく
    // 【TODO】行番号を加える処理を入れる
    // 【TODO】ソート処理を入れる
    var rows = [];
    var count = 0;
    items.forEach(item => {
        var col = {};
        col['#'] = ++count;
        for( var value in item.M){
            if( item.M[value].S ){
                col[value] = item.M[value].S;
            }
            if( item.M[value].L );
        }
        rows.push(col);
    });
    return rows;
}

export default fetchData;