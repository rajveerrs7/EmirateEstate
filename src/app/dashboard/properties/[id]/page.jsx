"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PropertyDetails from '@/app/components/PropertyDetails';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheckIcon } from 'lucide-react';
import { toast } from 'sonner';
import { RemoveSavedProperty, SaveProperty } from '@/services/Saves';

function PropertyInfoPage() {
    const params = useParams();
    const id = params.id;
    const [propertyData, setPropertyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Saved, setSaved] = useState(false);

    useEffect(() => {
        if (!id) return;
        
        const fetchPropertyData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const res = await fetch(`/api/getpropertyinfo?id=${id}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
                }
                
                const data = await res.json();
                if (data.success) {
                    setPropertyData(data.data);
                } else {
                    setPropertyData(data.data || null);
                    setError(data.error || 'Invalid Property ID');
                }
                
            } catch (error) {
                console.error("Error fetching property details:", error);
                setError(error.message);
                setPropertyData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyData();
    }, [id]);

    async function handleSave() {
        const req = {
            PropertyId: propertyData.id,
            title: propertyData.title,
            price: propertyData.price,
            coverPhoto: propertyData.media.cover_photo,
            city: propertyData.location.city.name,
            agency: propertyData.agency.name
        }
        try {
            const res = await SaveProperty(req)
            if(res.success){
                toast.success("saved successfully")
                setSaved(true)
            } else {
                toast.error("error saving Property")
            }
        } catch (error) {
            console.log("error saving data", error);
            toast.error("error saving Property")
        }
    }

    async function handleremove() {
        try {
            const data = await RemoveSavedProperty(id);
            if(data.success){
                setSaved(false)
                toast.success("Property removed successfully")
            } else {
                console.log("error removing property", error)
            }
        } catch (error) {
            console.log("error removing proprerty", error)
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-64 w-full mb-6" />
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                    </div>
                    <Skeleton className="h-32 w-full" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <div className="text-red-500 text-4xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Property</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }
    if (!propertyData) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Property Not Found</h2>
                    <p className="text-gray-600">The property with ID {id} could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='relative'>
            {!Saved && (<Button
            variant="outline" 
            className="absolute top-2 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white border-gray-300 shadow-md hover:shadow-lg transition-all"
            onClick={() => handleSave()}
            >
                <h3>Save</h3>
                <Bookmark className="w-4 h-4" />
            </Button>)}
            {Saved && <Button
            variant="outline" 
            className="absolute top-2 right-4 z-50 bg-white/90 backdrop-blur-sm hover:bg-white border-gray-300 shadow-md hover:shadow-lg transition-all"
            onClick={() => handleremove()}
            >
                <h3>Saved</h3>
                <BookmarkCheckIcon className="w-4 h-4" />
            </Button>}
            <PropertyDetails data={propertyData} />
        </div>
    );
}

export default PropertyInfoPage;