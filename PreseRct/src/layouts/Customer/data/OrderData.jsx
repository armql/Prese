const OrdersData = [
    {
        imgpreview: '../../Universal/images/vakti1.png',
        id: 1,
        header: 'Vakti II',
        description: '11x Crispy Strings, 2x L Fries, 1x Pepsi',
        price: 10.99,
        createdDate: new Date(2023, 12, 15),
        status_desc: 'Order is being looked upon please be patient!',
        status: 'pending',
        delivery_address: '635 Gavran Rr.Zymberi, Gjilan 6000, KOS',
        delivery_driver: 'Driton | Contact Driver(044 138 813)',
        delivery_updates: 'arlindm@example.com (307) 682-8835'
    },
    {
        imgpreview: '/src/images/vakti1.png',
        id: 2,
        header: 'Vakti II',
        description: '11x Crispy Strings, 2x L Fries, 1x Pepsi',
        price: 10.99,
        createdDate: new Date(2023, 15, 15),
        status_desc: 'Delivering order, soon to you!',
        status: 'delivering',
        delivery_address: '635 Gavran Rr.Zymberi, Gjilan 6000, KOS',
        delivery_driver: 'Driton | Contact Driver(044 138 813)',
    },
    {
        imgpreview: '/src/images/vakti1.png',
        id: 3,
        header: 'Vakti II',
        description: '11x Crispy Strings, 2x L Fries, 1x Pepsi',
        price: 10.99,
        createdDate: new Date(2023, 15, 15),
        status_desc: 'Order was delivered and paid.',
        status: 'delivered',
        delivery_address: '635 Gavran Rr.Zymberi, Gjilan 6000, KOS',
        delivery_driver: 'Driton | Contact Driver(044 138 813)',
    },
    {
        imgpreview: '/src/images/vakti1.png',
        id: 3,
        header: 'Vakti II',
        description: '11x Crispy Strings, 2x L Fries, 1x Pepsi',
        price: 10.99,
        createdDate: new Date(2023, 15, 15),
        status_desc: 'Order was unfortunately cancelled, if any questions contact us on delivering updates number or send an email.',
        status: 'cancelled',
        delivery_address: '635 Gavran Rr.Zymberi, Gjilan 6000, KOS',
        delivery_driver: 'Driton | Contact Driver(044 138 813)',
    }
    
];
export default OrdersData