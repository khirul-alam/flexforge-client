// 'use client';

// import { useState } from 'react';
// import { useRole } from '@/hooks/useRole';
// import { authFetch } from '@/utils/authFetch';

// export default function CommentItem({ comment, onUpdated }) {
//   const { user } = useRole();
//   const [editing, setEditing] = useState(false);
//   const [text, setText] = useState(comment.text);

//   const isOwner = user?.email === comment.userEmail;

//   const handleUpdate = async () => {
//     await authFetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/forum/comments/${comment._id}`,
//       {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text, userEmail: user.email }),
//       }
//     );
//     setEditing(false);
//     onUpdated();
//   };

//   const handleDelete = async () => {
//     if (!confirm('Delete this comment?')) return;
//     await authFetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/forum/comments/${comment._id}?userEmail=${user.email}`,
//       { method: 'DELETE' }
//     );
//     onUpdated();
//   };

//   return (
//     <div className="rounded-lg border p-4">
//       <div className="flex items-center justify-between">
//         <p className="font-medium">{comment.userName}</p>
//         {isOwner && (
//           <div className="flex gap-2 text-sm">
//             <button onClick={() => setEditing(!editing)} className="text-orange-500">
//               Edit
//             </button>
//             <button onClick={handleDelete} className="text-red-500">
//               Delete
//             </button>
//           </div>
//         )}
//       </div>

//       {editing ? (
//         <div className="mt-2 flex gap-2">
//           <input
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="flex-1 rounded-lg border p-2"
//           />
//           <button onClick={handleUpdate} className="rounded-lg bg-orange-500 px-4 text-white">
//             Save
//           </button>
//         </div>
//       ) : (
//         <p className="mt-1 text-gray-600">{comment.text}</p>
//       )}
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { useRole } from '@/hooks/useRole';
import { authFetch } from '@/utils/authFetch';

export default function CommentItem({ comment, onUpdated, onReply }) {
  const { user } = useRole();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const isOwner = user && user.email === comment.userEmail;

  const handleEdit = async () => {
    if (!editText.trim()) return;

    await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/comments/${comment._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText }),
    });

    setIsEditing(false);
    onUpdated();
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forum/comments/${comment._id}`, {
      method: 'DELETE',
    });

    onUpdated();
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={comment.userImage} 
            alt={comment.userName} 
            className="h-10 w-10 rounded-full object-cover" 
          />
          <div>
            <p className="font-semibold">{comment.userName}</p>
            <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Edit & Delete Buttons - Only for Owner */}
        {isOwner && (
          <div className="flex gap-3 text-sm">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button 
              onClick={handleDelete}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="mt-4 flex gap-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 rounded-lg border p-3"
          />
          <button onClick={handleEdit} className="rounded-lg bg-green-500 px-5 py-2 text-white">Save</button>
          <button onClick={() => { setIsEditing(false); setEditText(comment.text); }} className="rounded-lg border px-5 py-2">Cancel</button>
        </div>
      ) : (
        <p className="mt-3 text-gray-700">{comment.text}</p>
      )}

      {/* Reply Button */}
      {user && (
        <button 
          onClick={() => onReply(comment._id)}
          className="mt-4 text-sm text-orange-600 hover:underline"
        >
          Reply
        </button>
      )}
    </div>
  );
}