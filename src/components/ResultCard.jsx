// import React from 'react'

// export default function ResultCard({ title, data, raw=false }) {
//   return (
//     <div className="rounded-2xl border bg-white p-5 shadow-sm">
//       <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
//       {raw ? (
//         <div className="text-sm text-gray-700 space-y-3">
//           <div>
//             <p className="font-medium text-gray-600">Front</p>
//             <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 border text-xs">{data?.front || '-'}</pre>
//           </div>
//           <div>
//             <p className="font-medium text-gray-600">Back</p>
//             <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 border text-xs">{data?.back || '-'}</pre>
//           </div>
//         </div>
//       ) : (
//         <dl className="text-sm text-gray-700 grid grid-cols-1 gap-2">
//           <div className="grid grid-cols-3">
//             <dt className="text-gray-500">Aadhaar</dt>
//             <dd className="col-span-2">{data?.aadhaarNumber || '-'}</dd>
//           </div>
//           <div className="grid grid-cols-3">
//             <dt className="text-gray-500">Name</dt>
//             <dd className="col-span-2">{data?.name || '-'}</dd>
//           </div>
//           <div className="grid grid-cols-3">
//             <dt className="text-gray-500">DOB / YOB</dt>
//             <dd className="col-span-2">{data?.dob || '-'}</dd>
//           </div>
//           <div className="grid grid-cols-3">
//             <dt className="text-gray-500">Gender</dt>
//             <dd className="col-span-2">{data?.gender || '-'}</dd>
//           </div>
//           <div className="grid grid-cols-3">
//             <dt className="text-gray-500">Address</dt>
//             <dd className="col-span-2">{data?.address || '-'}</dd>
//           </div>
//         </dl>
//       )}
//     </div>
//   )
// }



import React from 'react'

export default function ResultCard({ title, data, raw = false }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
      {raw ? (
        <div className="text-sm text-gray-700 space-y-3">
          <div>
            <p className="font-medium text-gray-600">Front</p>
            <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 border text-xs">{data?.front || '-'}</pre>
          </div>
          <div>
            <p className="font-medium text-gray-600">Back</p>
            <pre className="whitespace-pre-wrap rounded-lg bg-gray-50 p-3 border text-xs">{data?.back || '-'}</pre>
          </div>
        </div>
      ) : (
        <dl className="text-sm text-gray-700 grid grid-cols-1 gap-2">
          <div className="grid grid-cols-3">
            <dt className="text-gray-500">Aadhaar</dt>
            <dd className="col-span-2">{data?.aadhaarNumber || '-'}</dd>
          </div>
          <div className="grid grid-cols-3">
            <dt className="text-gray-500">Name</dt>
            <dd className="col-span-2">{data?.name || '-'}</dd>
          </div>
          <div className="grid grid-cols-3">
            <dt className="text-gray-500">DOB / YOB</dt>
            <dd className="col-span-2">{data?.dob || '-'}</dd>
          </div>
          <div className="grid grid-cols-3">
            <dt className="text-gray-500">Gender</dt>
            <dd className="col-span-2">{data?.gender || '-'}</dd>
          </div>
          <div className="grid grid-cols-3">
            <dt className="text-gray-500">Address</dt>
            <dd className="col-span-2">{data?.address || '-'}</dd>
          </div>
        </dl>
      )}
    </div>
  )
}
