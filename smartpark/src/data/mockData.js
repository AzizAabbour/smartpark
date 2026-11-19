export const initialParkingFacilities = [
  {
    id: "park-1",
    name: "Central Plaza Parking",
    slug: "central-plaza-parking",
    address: "142 Market Street, Financial District, San Francisco, CA",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    coordinates: { lat: 37.7915, lng: -122.4005 },
    totalSpaces: 156,
    availableSpaces: 42,
    hourlyRate: 3.50,
    dailyRate: 28.00,
    openingHours: "24/7",
    distance: "0.3 km",
    rating: 4.8,
    reviewCount: 142,
    description: "Multi-level covered smart parking structure located right in the heart of downtown. Equipped with EV charging stations, 24/7 CCTV surveillance, automated license plate recognition, and mobile gate access.",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1000&q=80",
    features: ["EV Charging", "Covered Parking", "CCTV Surveillance", "Accessible", "Car Wash", "Valet Option"],
    status: "Available",
    type: "Covered Structure",
    securityInfo: "Manned security guards 24/7, over 64 HD surveillance cameras, panic buttons on all floors.",
    reviews: [
      { id: "rev-1", user: "Sarah Jenkins", rating: 5, date: "2026-11-10", comment: "Super smooth entry with mobile scanner! Brightly lit and felt extremely safe at night." },
      { id: "rev-2", user: "Michael Chang", rating: 4, date: "2026-11-04", comment: "Great central location. The EV chargers are fast and readily accessible on level 2." }
    ]
  },
  {
    id: "park-2",
    name: "Bayview Metro Garage",
    slug: "bayview-metro-garage",
    address: "880 Harrison St, SOMA, San Francisco, CA",
    city: "San Francisco",
    state: "CA",
    zipCode: "94107",
    coordinates: { lat: 37.7812, lng: -122.4011 },
    totalSpaces: 240,
    availableSpaces: 88,
    hourlyRate: 2.75,
    dailyRate: 22.00,
    openingHours: "06:00 AM - 11:00 PM",
    distance: "0.8 km",
    rating: 4.6,
    reviewCount: 98,
    description: "Modern facility ideal for commuters and business professionals. Features high clearances, direct metro tunnel connections, and dedicated monthly reservation slots.",
    image: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=1000&q=80",
    features: ["Metro Transit Link", "Covered Parking", "Security Gate", "Accessible", "Elevators"],
    status: "Available",
    type: "Underground",
    securityInfo: "Automated badge barriers, continuous patrol, license plate tracking.",
    reviews: [
      { id: "rev-3", user: "David Miller", rating: 5, date: "2026-10-28", comment: "Best rates near SOMA. Never had trouble finding a spot." }
    ]
  },
  {
    id: "park-3",
    name: "Marina Harbour Lot",
    slug: "marina-harbour-lot",
    address: "20 Marina Blvd, Marina District, San Francisco, CA",
    city: "San Francisco",
    state: "CA",
    zipCode: "94123",
    coordinates: { lat: 37.8045, lng: -122.4345 },
    totalSpaces: 90,
    availableSpaces: 8,
    hourlyRate: 4.00,
    dailyRate: 32.00,
    openingHours: "24/7",
    distance: "1.4 km",
    rating: 4.9,
    reviewCount: 215,
    description: "Scenic waterfront parking right next to the yacht club and Golden Gate park trails. High demand on weekends, reserve in advance for guaranteed spots.",
    image: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=1000&q=80",
    features: ["Scenic View", "Open Air", "EV Charging", "Camera Monitoring"],
    status: "Almost Full",
    type: "Open Surface",
    securityInfo: "24/7 solar security poles with automated motion lighting.",
    reviews: [
      { id: "rev-4", user: "Emily Watson", rating: 5, date: "2026-11-12", comment: "Saved my weekend run! Spots are wider than average so no door ding worries." }
    ]
  },
  {
    id: "park-4",
    name: "Civic Center Express Park",
    slug: "civic-center-express-park",
    address: "355 McAllister St, Civic Center, San Francisco, CA",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    coordinates: { lat: 37.7801, lng: -122.4182 },
    totalSpaces: 310,
    availableSpaces: 112,
    hourlyRate: 2.25,
    dailyRate: 18.00,
    openingHours: "24/7",
    distance: "1.1 km",
    rating: 4.4,
    reviewCount: 84,
    description: "Massive smart facility serving city hall, symphony hall, and opera house visitors. Includes automated space guidance LED indicators over every stall.",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80",
    features: ["Overhead Sensors", "EV Charging", "Covered Parking", "Accessible", "24/7 Guard"],
    status: "Available",
    type: "Covered Structure",
    securityInfo: "Strict access control, physical security checkpoints on each floor.",
    reviews: [
      { id: "rev-5", user: "Marcus Vance", rating: 4, date: "2026-10-15", comment: "Green and red lights over each stall make spotting an empty space effortless." }
    ]
  },
  {
    id: "park-5",
    name: "Mission Tech Hub Parking",
    slug: "mission-tech-hub-parking",
    address: "2600 Mission St, Mission District, San Francisco, CA",
    city: "San Francisco",
    state: "CA",
    zipCode: "94110",
    coordinates: { lat: 37.7554, lng: -122.4189 },
    totalSpaces: 110,
    availableSpaces: 0,
    hourlyRate: 3.00,
    dailyRate: 24.00,
    openingHours: "07:00 AM - 10:00 PM",
    distance: "2.5 km",
    rating: 4.7,
    reviewCount: 63,
    description: "Conveniently positioned in the bustling Mission district near restaurants and tech workspaces. Features ultra-fast DC fast chargers.",
    image: "https://images.unsplash.com/photo-1545179605-1296651e4d43?auto=format&fit=crop&w=1000&q=80",
    features: ["DC Fast Charging", "Bicycle Lockers", "Covered", "Touchless Exit"],
    status: "Occupied",
    type: "Underground",
    securityInfo: "Automated license-plate verification and emergency callboxes.",
    reviews: [
      { id: "rev-6", user: "Chloe Adams", rating: 5, date: "2026-09-20", comment: "Super fast entry via QR code. Highly recommended for dining in the Mission." }
    ]
  },
  {
    id: "park-6",
    name: "Embarcadero Pier Center",
    slug: "embarcadero-pier-center",
    address: "1 Ferry Building, The Embarcadero, San Francisco, CA",
    city: "San Francisco",
    state: "CA",
    zipCode: "94111",
    coordinates: { lat: 37.7955, lng: -122.3937 },
    totalSpaces: 180,
    availableSpaces: 26,
    hourlyRate: 4.50,
    dailyRate: 36.00,
    openingHours: "24/7",
    distance: "0.5 km",
    rating: 4.9,
    reviewCount: 310,
    description: "Premium garage directly across from the Ferry Building marketplace and bay ferries. Top tier security, clean premises, and VIP oversized spots.",
    image: "https://images.unsplash.com/photo-1562619371-b67725b6fde2?auto=format&fit=crop&w=1000&q=80",
    features: ["Ferry Access", "VIP Spots", "EV Charging", "Valet Option", "Hand Car Wash"],
    status: "Available",
    type: "Covered Structure",
    securityInfo: "Round-the-clock patrol with high-resolution continuous digital recording.",
    reviews: [
      { id: "rev-7", user: "Robert Lang", rating: 5, date: "2026-11-18", comment: "Unbeatable location for Ferry Building dining and business lunches." }
    ]
  }
];

// Realistic parking spots inside Central Plaza & other facilities
export const initialParkingSpaces = [
  // Central Plaza Level 1
  { id: "sp-101", facilityId: "park-1", spaceNumber: "A-01", floor: "Ground", type: "Standard", status: "Available", rateMultiplier: 1.0, vehiclePlate: null },
  { id: "sp-102", facilityId: "park-1", spaceNumber: "A-02", floor: "Ground", type: "Standard", status: "Occupied", rateMultiplier: 1.0, vehiclePlate: "7XYZ912" },
  { id: "sp-103", facilityId: "park-1", spaceNumber: "A-03", floor: "Ground", type: "EV Charging", status: "Available", rateMultiplier: 1.25, vehiclePlate: null },
  { id: "sp-104", facilityId: "park-1", spaceNumber: "A-04", floor: "Ground", type: "EV Charging", status: "Occupied", rateMultiplier: 1.25, vehiclePlate: "6EVT881" },
  { id: "sp-105", facilityId: "park-1", spaceNumber: "A-05", floor: "Ground", type: "Accessible", status: "Available", rateMultiplier: 1.0, vehiclePlate: null },
  { id: "sp-106", facilityId: "park-1", spaceNumber: "A-06", floor: "Ground", type: "Standard", status: "Reserved", rateMultiplier: 1.0, vehiclePlate: "5ABC334" },
  { id: "sp-107", facilityId: "park-1", spaceNumber: "A-07", floor: "Ground", type: "VIP", status: "Occupied", rateMultiplier: 1.5, vehiclePlate: "8LUX777" },
  { id: "sp-108", facilityId: "park-1", spaceNumber: "A-08", floor: "Ground", type: "Standard", status: "Available", rateMultiplier: 1.0, vehiclePlate: null },
  { id: "sp-109", facilityId: "park-1", spaceNumber: "A-09", floor: "Ground", type: "Maintenance", status: "Maintenance", rateMultiplier: 1.0, vehiclePlate: null },
  { id: "sp-110", facilityId: "park-1", spaceNumber: "A-10", floor: "Ground", type: "Standard", status: "Available", rateMultiplier: 1.0, vehiclePlate: null },
  // Row B
  { id: "sp-111", facilityId: "park-1", spaceNumber: "B-01", floor: "Level 1", type: "Standard", status: "Available", rateMultiplier: 1.0, vehiclePlate: null },
  { id: "sp-112", facilityId: "park-1", spaceNumber: "B-02", floor: "Level 1", type: "Standard", status: "Occupied", rateMultiplier: 1.0, vehiclePlate: "4MNO921" },
  { id: "sp-113", facilityId: "park-1", spaceNumber: "B-03", floor: "Level 1", type: "Standard", status: "Available", rateMultiplier: 1.0, vehiclePlate: null },
  { id: "sp-114", facilityId: "park-1", spaceNumber: "B-04", floor: "Level 1", type: "EV Charging", status: "Reserved", rateMultiplier: 1.25, vehiclePlate: "3EVP440" },
  { id: "sp-115", facilityId: "park-1", spaceNumber: "B-05", floor: "Level 1", type: "Standard", status: "Available", rateMultiplier: 1.0, vehiclePlate: null },
  { id: "sp-116", facilityId: "park-1", spaceNumber: "B-06", floor: "Level 1", type: "VIP", status: "Available", rateMultiplier: 1.5, vehiclePlate: null },

  // Bayview Metro Spaces
  { id: "sp-201", facilityId: "park-2", spaceNumber: "M-01", floor: "Underground B1", type: "Standard", status: "Available", rateMultiplier: 1.0, vehiclePlate: null },
  { id: "sp-202", facilityId: "park-2", spaceNumber: "M-02", floor: "Underground B1", type: "EV Charging", status: "Occupied", rateMultiplier: 1.25, vehiclePlate: "2TES990" },
  { id: "sp-203", facilityId: "park-2", spaceNumber: "M-03", floor: "Underground B1", type: "Accessible", status: "Available", rateMultiplier: 1.0, vehiclePlate: null },
  { id: "sp-204", facilityId: "park-2", spaceNumber: "M-04", floor: "Underground B1", type: "Standard", status: "Available", rateMultiplier: 1.0, vehiclePlate: null },
  
  // Marina Harbour
  { id: "sp-301", facilityId: "park-3", spaceNumber: "H-01", floor: "Surface", type: "Standard", status: "Occupied", rateMultiplier: 1.0, vehiclePlate: "9WAT123" },
  { id: "sp-302", facilityId: "park-3", spaceNumber: "H-02", floor: "Surface", type: "VIP", status: "Occupied", rateMultiplier: 1.5, vehiclePlate: "1POR911" },
  { id: "sp-303", facilityId: "park-3", spaceNumber: "H-03", floor: "Surface", type: "Standard", status: "Available", rateMultiplier: 1.0, vehiclePlate: null },

  // Civic Center
  { id: "sp-401", facilityId: "park-4", spaceNumber: "C-01", floor: "Floor 1", type: "Standard", status: "Available", rateMultiplier: 1.0, vehiclePlate: null },
  { id: "sp-402", facilityId: "park-4", spaceNumber: "C-02", floor: "Floor 1", type: "EV Charging", status: "Available", rateMultiplier: 1.25, vehiclePlate: null },
  { id: "sp-403", facilityId: "park-4", spaceNumber: "C-03", floor: "Floor 1", type: "Standard", status: "Occupied", rateMultiplier: 1.0, vehiclePlate: "7CIV445" }
];

export const initialUsers = [
  {
    id: "usr-admin-1",
    fullName: "Anis K. Parker",
    email: "admin@smartpark.com",
    role: "admin",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    status: "Active",
    registeredAt: "2026-01-15T08:00:00Z",
    totalBookings: 14
  },
  {
    id: "usr-demo-1",
    fullName: "Alex Rivera",
    email: "alex.rivera@example.com",
    role: "user",
    phone: "+1 (555) 876-5432",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    status: "Active",
    registeredAt: "2026-03-20T14:30:00Z",
    vehiclePlate: "7XYZ912",
    vehicleModel: "Tesla Model 3 (Pearl White)",
    totalBookings: 6
  },
  {
    id: "usr-2",
    fullName: "Sophia Martinez",
    email: "sophia.m@example.com",
    role: "user",
    phone: "+1 (555) 432-1098",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    status: "Active",
    registeredAt: "2026-05-11T10:15:00Z",
    vehiclePlate: "6EVT881",
    vehicleModel: "Audi e-tron GT (Mythos Black)",
    totalBookings: 11
  },
  {
    id: "usr-3",
    fullName: "Marcus Brody",
    email: "marcus.b@example.com",
    role: "user",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    status: "Inactive",
    registeredAt: "2026-07-01T09:00:00Z",
    vehiclePlate: "3EVP440",
    vehicleModel: "BMW i4 (Portimao Blue)",
    totalBookings: 2
  }
];

export const initialReservations = [
  {
    id: "res-9011",
    reference: "SP-2026-9011",
    userId: "usr-demo-1",
    userName: "Alex Rivera",
    userEmail: "alex.rivera@example.com",
    facilityId: "park-1",
    facilityName: "Central Plaza Parking",
    spaceId: "sp-102",
    spaceNumber: "A-02",
    spaceType: "Standard",
    vehiclePlate: "7XYZ912",
    startTime: "2026-11-19T09:00:00Z",
    endTime: "2026-11-19T18:00:00Z",
    durationHours: 9,
    totalPrice: 31.50,
    status: "Active",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card (Visa ending in 4242)",
    bookedAt: "2026-11-18T19:30:00Z"
  },
  {
    id: "res-9012",
    reference: "SP-2026-9012",
    userId: "usr-demo-1",
    userName: "Alex Rivera",
    userEmail: "alex.rivera@example.com",
    facilityId: "park-3",
    facilityName: "Marina Harbour Lot",
    spaceId: "sp-303",
    spaceNumber: "H-03",
    spaceType: "Standard",
    vehiclePlate: "7XYZ912",
    startTime: "2026-11-21T10:00:00Z",
    endTime: "2026-11-21T16:00:00Z",
    durationHours: 6,
    totalPrice: 24.00,
    status: "Upcoming",
    paymentStatus: "Paid",
    paymentMethod: "Apple Pay",
    bookedAt: "2026-11-19T08:15:00Z"
  },
  {
    id: "res-9010",
    reference: "SP-2026-9010",
    userId: "usr-demo-1",
    userName: "Alex Rivera",
    userEmail: "alex.rivera@example.com",
    facilityId: "park-2",
    facilityName: "Bayview Metro Garage",
    spaceId: "sp-201",
    spaceNumber: "M-01",
    spaceType: "Standard",
    vehiclePlate: "7XYZ912",
    startTime: "2026-11-15T08:00:00Z",
    endTime: "2026-11-15T17:00:00Z",
    durationHours: 9,
    totalPrice: 24.75,
    status: "Completed",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card (Visa ending in 4242)",
    bookedAt: "2026-11-14T11:20:00Z"
  },
  {
    id: "res-8874",
    reference: "SP-2026-8874",
    userId: "usr-2",
    userName: "Sophia Martinez",
    userEmail: "sophia.m@example.com",
    facilityId: "park-1",
    facilityName: "Central Plaza Parking",
    spaceId: "sp-104",
    spaceNumber: "A-04",
    spaceType: "EV Charging",
    vehiclePlate: "6EVT881",
    startTime: "2026-11-19T08:30:00Z",
    endTime: "2026-11-19T17:30:00Z",
    durationHours: 9,
    totalPrice: 39.38,
    status: "Active",
    paymentStatus: "Paid",
    paymentMethod: "Mastercard (ending in 8891)",
    bookedAt: "2026-11-18T21:40:00Z"
  },
  {
    id: "res-8850",
    reference: "SP-2026-8850",
    userId: "usr-3",
    userName: "Marcus Brody",
    userEmail: "marcus.b@example.com",
    facilityId: "park-4",
    facilityName: "Civic Center Express Park",
    spaceId: "sp-401",
    spaceNumber: "C-01",
    spaceType: "Standard",
    vehiclePlate: "3EVP440",
    startTime: "2026-11-12T13:00:00Z",
    endTime: "2026-11-12T19:00:00Z",
    durationHours: 6,
    totalPrice: 13.50,
    status: "Cancelled",
    paymentStatus: "Refunded",
    paymentMethod: "Google Pay",
    bookedAt: "2026-11-11T16:00:00Z"
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    userId: "usr-demo-1",
    title: "Reservation Active",
    message: "Your reservation SP-2026-9011 at Central Plaza Parking is active today. Gate scanner will auto-detect your plate 7XYZ912.",
    time: "10 mins ago",
    read: false,
    type: "info"
  },
  {
    id: "notif-2",
    userId: "usr-demo-1",
    title: "Booking Confirmed",
    message: "Marina Harbour Lot reservation SP-2026-9012 has been successfully confirmed for Nov 21.",
    time: "3 hours ago",
    read: false,
    type: "success"
  },
  {
    id: "notif-3",
    userId: "usr-demo-1",
    title: "Special Weekend Discount",
    message: "Save 15% on long-term parking at Bayview Metro with promo code METRO15.",
    time: "1 day ago",
    read: true,
    type: "promo"
  }
];

export const initialRevenueStats = {
  totalRevenue: 52450.00,
  monthlyExpenses: 20500.00,
  netIncome: 31950.00,
  dailyChartData: [
    { day: "Mon", revenue: 1420, bookings: 42, occupancy: 72 },
    { day: "Tue", revenue: 1850, bookings: 58, occupancy: 78 },
    { day: "Wed", revenue: 2100, bookings: 66, occupancy: 84 },
    { day: "Thu", revenue: 2450, bookings: 79, occupancy: 89 },
    { day: "Fri", revenue: 2900, bookings: 95, occupancy: 94 },
    { day: "Sat", revenue: 3400, bookings: 112, occupancy: 96 },
    { day: "Sun", revenue: 2200, bookings: 70, occupancy: 76 }
  ],
  monthlyChartData: [
    { month: "Jan", sales: 38000, expenses: 18000, revenue: 20000 },
    { month: "Feb", sales: 42000, expenses: 19000, revenue: 23000 },
    { month: "Mar", sales: 45000, expenses: 19500, revenue: 25500 },
    { month: "Apr", sales: 49000, expenses: 20000, revenue: 29000 },
    { month: "May", sales: 53000, expenses: 21000, revenue: 32000 },
    { month: "Jun", sales: 50000, expenses: 20500, revenue: 29500 },
    { month: "Jul", sales: 56000, expenses: 22000, revenue: 34000 },
    { month: "Aug", sales: 58000, expenses: 22500, revenue: 35500 },
    { month: "Sep", sales: 51000, expenses: 21000, revenue: 30000 },
    { month: "Oct", sales: 54000, expenses: 21500, revenue: 32500 },
    { month: "Nov", sales: 61000, expenses: 23000, revenue: 38000 },
    { month: "Dec", sales: 68000, expenses: 24000, revenue: 44000 }
  ],
  spaceDistribution: [
    { name: "Standard Spaces", value: 680, color: "#2563EB" },
    { name: "EV Charging", value: 160, color: "#16A34A" },
    { name: "Accessible / ADA", value: 90, color: "#F59E0B" },
    { name: "VIP / Reserved", value: 70, color: "#9333EA" }
  ],
  recentActivities: [
    { id: "act-1", time: "09:42 AM", title: "Vehicle Entry Check-in", description: "Vehicle 7XYZ912 entered Central Plaza Parking (Space A-02).", type: "entry" },
    { id: "act-2", time: "09:15 AM", title: "New Online Reservation", description: "Sophia Martinez booked EV stall A-04 at Central Plaza.", type: "booking" },
    { id: "act-3", time: "08:50 AM", title: "Vehicle Exit & Payment", description: "Vehicle 4MNO921 checked out from Bayview Metro Garage.", type: "exit" },
    { id: "act-4", time: "08:30 AM", title: "Facility Maintenance Scheduled", description: "Space A-09 placed in Maintenance mode for sensor calibration.", type: "system" },
    { id: "act-5", time: "07:45 AM", title: "Morning Gate Inspection", description: "Civic Center entry gate sensors online and calibrated.", type: "system" }
  ]
};
