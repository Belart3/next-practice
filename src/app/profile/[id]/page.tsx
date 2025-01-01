export default function UserProfile({params}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-2">
            <h1>Profile</h1>
            <p className="text-gray-500 text-4xl">
                profile page 
                <span className="text-blue-500 p-2">{params.id}</span>
            </p>
        </div>
    )
}