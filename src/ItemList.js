////////////////////////////////////////////////////////////////////////////////
//
//  JSON の配列に行番号を付与して表示する コンポーネント
//

import React from 'react';
import SearchControl from './SearchControl';
import ListHeader from './ListHeader';
import Pager from './Pager';
import Table from 'react-bootstrap/Table';
import CreateCSV from './CreateCSV';

import { Row } from 'react-bootstrap';


class ItemList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: "",     // user or folder
            id: null,   // 表示中の検索ID 
            sort: { "folder": "" },
            order: "",   // ASC or DESC 
            items: [],
            pages: null,   // 全体ページ数
            rows: null,   // 1ページの表示件数
            page: null,   // 表示するページ番号
            total: 0    // 検索合計件数
        };

    }

    // 子コンポーネントの検索コントローラがデータをセットする
    updateList(state) {
        this.setState({
            type: state.type,
            id: state.id,
            sort: state.sort,
            order: state.order,
            items: state.items,
            pages: state.pages,
            rows: state.rows,
            page: state.page,
            total: state.total
        });
        // console.info("Set received data.");
        // console.log(this.state);
    }

    render() {
        var items = this.state.items;
        const header_label = {
            "#": "#",
            "user_email": "メールアドレス",
            "user_name": "ユーザ名",
            "path": "フォルダパス",
            "folder": "フォルダ名",
            "permission": "権限",
            "owner": "管理者",
            "p_read": "閲覧権限",
            "p_download": "ダウンロード権限",
            "p_upload": "アップロード権限",
            "p_admin": "管理権限",
            "p_delete": "削除権限"
        }


        return (
            <div>
                <SearchControl id="SearchControl" query={this.state}
                    updateList={(data) => { this.updateList(data); }} />
                {// 検索してないときは何も表示しない
                    (items.length === 0) && typeof (this.state.id) !== "string" && (
                        <p>検索条件を入力し検索してください。</p>
                    )
                }
                {// 検索して結果が0件の時は 結果がないと表示する
                    (items.length === 0) && typeof (this.state.id) == "string" && (
                        <p>該当するデータが見つかりませんでした。</p>
                    )
                }
                <div id="List">
                    {// 表示行数が0行の時は表示しない
                        (items.length !== 0) && (
                            <div>
                                <CreateCSV query={this.state} header_label={header_label}></CreateCSV>
                                <Pager className="vertical-align-middle" as={Row} query={this.state}  updateList={(data) => { this.updateList(data); }}></Pager>
                                <Table striped bordered hover id="res_table">
                                    <tbody>
                                        <ListHeader id="res_table"
                                            query={this.state} 
                                            updateList={(data) => { this.updateList(data); }} 
                                            header_label={header_label} />
                                        {items.map((row, index) => (
                                            <tr key={index}>
                                                {Object.values(row).map((col, index) => {
                                                    if (index === 0) return (<th key={index}>{col}</th>) // 1列目
                                                    else return (<td key={index}>{col}</td>)
                                                })}
                                            </tr>))}
                                    </tbody>
                                </Table>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}


export default ItemList;