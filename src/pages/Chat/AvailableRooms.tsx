import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaSearch, FaSpinner } from 'react-icons/fa';
import { API_SERVER } from '../../utils/env_alias';
import { genFetchOpts } from "../../utils/fetch_options";

interface Room {
  _id: string;
  name: string;
  host: any;
  participants: any[];
  messages: any[];
  createdAt: string;
  description?: string;
}

const AvailableRooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    fetchRooms();
  }, [searchTerm]);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const url = searchTerm ? `${API_SERVER}/rooms?name=${encodeURIComponent(searchTerm)}`: `${API_SERVER}/rooms`
      const response = await fetch(url, genFetchOpts("GET"));
      const data = await response.json();
      setRooms(data?.rooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get('search') as string;
    setSearchParams({ search });
  };

  return (
      <div className="container mx-auto px-4 py-8 min-h-screen pt-[8rem] border-none outline-none">
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex justify-center">
            <div className="join w-full max-w-md">
              <input
                type="text"
                name="search"
                placeholder="Search rooms..."
                className="input input-bordered join-item flex-grow"
                defaultValue={searchTerm}
              />
              <button type="submit" className="btn join-item btn-primary">
                <FaSearch />
              </button>
            </div>
          </div>
        </form>
    
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-primary" />
          </div>
        ) : rooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {rooms.map((room) => (
              <div key={room._id} className="card bg-base-200 shadow-xl transition-all duration-300 hover:scale-105">
                <div className="card-body">
                  <h2 className="card-title text-lg sm:text-xl">{room.name}</h2>
                  {/* Add more room details here */}
                  {room.description && <p className="text-sm text-base-content/70">{room.description}</p>}
                  <div className="card-actions justify-end mt-4">
                    <Link to={`/rooms/${room._id}/join`} className="btn btn-primary btn-sm sm:btn-md">Join</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info max-w-md mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>No rooms found.</span>
          </div>
        )}
      </div>
    );

};

export default AvailableRooms;
