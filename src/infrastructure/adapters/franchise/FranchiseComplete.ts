export interface FranchiseComplete {
  id: string;
  name: string;
  branches: BranchComplete[];
}

export interface BranchComplete {
  id: string;
  franchiseId: string;
  name: string;
  products: ProductComplete[];
}

export interface ProductComplete {
  id: string;
  branchId: string;
  name: string;
  stock: number;
}

// {
//     "id": "bb5463ba-cea6-4da4-9e39-b11d1188334b",
//     "name": "franchise-1",
//     "createdAt": "2025-05-31T01:56:20.000Z",
//     "updatedAt": "2025-05-31T01:56:20.000Z",
//     "branches": [
//         {
//             "id": "078b41f4-6abc-4a46-ad88-639c82ddf22d",
//             "franchiseId": "bb5463ba-cea6-4da4-9e39-b11d1188334b",
//             "name": "zarate-1",
//             "createdAt": "2025-05-31T02:25:37.000Z",
//             "updatedAt": "2025-05-31T02:25:37.000Z",
//             "products": [
//                 {
//                     "id": "1f1152d2-200e-472f-93be-91a3243b9502",
//                     "branchId": "078b41f4-6abc-4a46-ad88-639c82ddf22d",
//                     "name": "Tomatodos",
//                     "stock": 1,
//                     "createdAt": "2025-06-03T22:49:55.000Z",
//                     "updatedAt": "2025-06-03T22:49:55.000Z"
//                 }
//             ]
//         },
//         {
//             "id": "2bbf2acb-a096-4b16-b2c4-9186869681d6",
//             "franchiseId": "bb5463ba-cea6-4da4-9e39-b11d1188334b",
//             "name": "Zarate1",
//             "createdAt": "2025-06-03T22:47:13.000Z",
//             "updatedAt": "2025-06-03T22:47:13.000Z",
//             "products": []
//         },
//         {
//             "id": "7795ce1d-a5d4-42bc-81e1-149ca22da7ac",
//             "franchiseId": "bb5463ba-cea6-4da4-9e39-b11d1188334b",
//             "name": "Zarate1",
//             "createdAt": "2025-06-03T22:34:13.000Z",
//             "updatedAt": "2025-06-03T22:34:13.000Z",
//             "products": []
//         },
//         {
//             "id": "789077e3-79fe-4a5c-8f21-b85f7bde4af1",
//             "franchiseId": "bb5463ba-cea6-4da4-9e39-b11d1188334b",
//             "name": "zarate-1",
//             "createdAt": "2025-05-31T02:04:45.000Z",
//             "updatedAt": "2025-05-31T02:04:45.000Z",
//             "products": []
//         }
//     ]
// }
