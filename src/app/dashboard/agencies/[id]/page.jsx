"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AgencyDetails from '@/app/components/AgencyDetails';
import { Skeleton } from '@/components/ui/skeleton';
import { Bookmark, BookmarkCheck, BookmarkCheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RemoveSavedAgency, SaveAgency } from '@/services/Saves';

function AgencyInfoPage() {
    const params = useParams();
    const id = params.id;
    const [AgencyData, setAgencyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Saved, setSaved] = useState(false);

    useEffect(() => {
        if (!id) return;
        
        const fetchAgencyData = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const res = await fetch(`/api/getagencyinfo?id=${id}`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
                }
                
                const data = await res.json();
                if (data.success) {
                    setAgencyData(data.data);
                } else {
                    setAgencyData(data.data || null);
                    setError(data.error || 'Invalid Agency ID');
                }
                
            } catch (error) {
                console.error("Error fetching agency details:", error);
                setError(error.message);
                setAgencyData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAgencyData();
    }, [id]);

    async function handleSave() {
        const req = {
            agencyId: AgencyData.id,
            name: AgencyData.name,
            logo: AgencyData.logo,
            base_location: AgencyData.base_location,
            active_agents: AgencyData.agents_count
        }
        try {
            const res = await SaveAgency(req)
            if(res.success){
                toast.success("saved successfully")
                setSaved(true)
            } else {
                toast.error("error saving agency")
            }
        } catch (error) {
            console.log("error saving data", error);
            toast.error("error saving agency")
        }
    }

    async function handleremove() {
        try {
            const res = await RemoveSavedAgency(id);
            if(res.success){
                setSaved(false);
                toast.success("agency removed from saves")
            }
        } catch (error) {
            console.log("error removing save", error)
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
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Agency</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                </div>
            </div>
        );
    }
    if (!AgencyData) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Agency Not Found</h2>
                    <p className="text-gray-600">The Agency with ID {id} could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
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
        <AgencyDetails data={AgencyData} />
        </div>
    );
}

export default AgencyInfoPage;;