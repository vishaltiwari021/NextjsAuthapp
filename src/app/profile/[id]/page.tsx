type UserProfilePageProps = {
    params: Promise<{ id: string }>;
};

export default async function UserProfile({ params }: UserProfilePageProps) {
    const { id } = await params;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile Page</h1>
            <p className="rounded bg-amber-500 text-2xl text-black">
                This is the profile page for user with ID: {id}. Only authenticated users can see this.
            </p>
        </div>
    );
}

