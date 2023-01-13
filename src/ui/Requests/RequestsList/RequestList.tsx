import React, {useState} from 'react';
import {List} from "antd";
import {setPoints} from "../../../redux/slices/geometrySlice";
import {useAppDispatch} from "../../../redux/store";
import {requestsListData} from "../consts/requestsListData";

export const RequestList = () => {
    const dispatch = useAppDispatch()

    const [selectedItem, setSelectedItem] = useState<number | null>(null);

    const onClickHandle = (points: number[]) => {
        dispatch(setPoints(points))
    }

    return (
        <List
            itemLayout="horizontal"
            dataSource={requestsListData}
            className='RequestList'
            header={
                <List.Item>
                    <div>Номер заявки</div>
                    <div>Координаты <br/> ОТ lat</div>
                    <div>Координаты <br/> ОТ lng</div>
                    <div>Координаты <br/> ДО lat</div>
                    <div>Координаты <br/> ДО lng</div>
                </List.Item>
            }
            renderItem={(item) => (
                <List.Item
                    key={item.id}
                    className={`listItem ${item.id === selectedItem && 'activeItem'}`}
                    onClick={() => {
                        setSelectedItem(item.id)
                        onClickHandle([item.fromLat, item.fromLng, item.toLat, item.toLng])
                    }}
                >
                    <div>{item.id}</div>
                    <div>{item.fromLat}</div>
                    <div>{item.fromLng}</div>
                    <div>{item.toLat}</div>
                    <div>{item.toLng}</div>
                </List.Item>
            )}
        />
    );
};

