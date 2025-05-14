import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from 'react-leaflet';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({
  position,
  onLocationSelect,
}: {
  position: L.LatLng | null;
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

export default function MapSelection() {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);
  const [isSearching, setIsSearching] = useState(false);
  const [locationInfo, setLocationInfo] = useState<string | null>(null);
  const [markerPosition, setMarkerPosition] = useState<L.LatLng | null>(null);

  const getLocationInfo = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data.display_name) {
        setLocationInfo(data.display_name);
      }
    } catch (error) {
      console.error('Error getting location info:', error);
      setLocationInfo(null);
    }
  };

  const handleLocationSelect = async (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setMarkerPosition(new L.LatLng(lat, lng));
    await getLocationInfo(lat, lng);
  };

  const handleConfirm = () => {
    if (selectedLocation && locationInfo) {
      localStorage.setItem(
        'selectedLocation',
        JSON.stringify({
          ...selectedLocation,
          address: locationInfo,
        })
      );
      navigate('/app/createProfile');
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();

      if (data && data[0]) {
        const { lat, lon } = data[0];
        const newLat = parseFloat(lat);
        const newLng = parseFloat(lon);
        setMapCenter([newLat, newLng]);
        setSelectedLocation({ lat: newLat, lng: newLng });
        setMarkerPosition(new L.LatLng(newLat, newLng));
        await getLocationInfo(newLat, newLng);
      }
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className='h-screen flex flex-col'>
      <div className='p-4 bg-white shadow-md'>
        <h1 className='text-2xl font-medium text-[#2f3438] mb-4'>
          Choose Your Location
        </h1>
        <form onSubmit={handleSearch} className='flex gap-2'>
          <Input
            type='text'
            placeholder='Search for a location...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='flex-1'
          />
          <Button
            type='submit'
            disabled={isSearching}
            className='bg-gradient-to-r from-[#f83e67] to-[#a50976] text-white'
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </form>
      </div>
      <div className='flex-1 relative'>
        <MapContainer center={mapCenter} zoom={13} className='h-full w-full'>
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <LocationMarker
            position={markerPosition}
            onLocationSelect={handleLocationSelect}
          />
          <MapController center={mapCenter} />
        </MapContainer>
      </div>
      <div className='p-4 bg-white shadow-md flex flex-col gap-2'>
        {locationInfo && (
          <div className='text-sm text-gray-600 bg-gray-50 p-3 rounded'>
            <strong>Selected Location:</strong> {locationInfo}
          </div>
        )}
        <Button
          onClick={handleConfirm}
          disabled={!selectedLocation || !locationInfo}
          className='w-full h-[60px] rounded-[13.31px] bg-gradient-to-r from-[#f83e67] to-[#a50976] text-white font-medium text-[15px]'
        >
          Confirm Location
        </Button>
      </div>
    </div>
  );
}
