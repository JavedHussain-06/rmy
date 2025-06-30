import { create } from 'zustand';

const useDataStore = create((set) => ({
  numberPlate: '',
  eligibility: undefined,
  eligibilityId: null,
  eligibilityData: {},
  eligibilityErrorMessage: '',
  tags: [],
  paymentStatus: '',
  currentStage: 1,
  placeHolder: 'DL12AB1234',
  isLoggedIn: false,
  isVrnValid: false,
  mobileNumber: '',
  passMobileNumber: '',
  userId: '',
  passUserId: "",
  verifiedNumbers: [],
  ownerName: "",

  setNumberPlate: (plate) => set({ numberPlate: plate }),
  setEligibility: (isEligible) => set({ eligibility: isEligible }),
  setEligibilityId: (id) => set({ eligibilityId: id }),
  setTags: (tagList) => set({ tags: tagList }),
  setEligibilityData: (data) => set({ eligibilityData: data }),
  setEligibilityErrorMessage: (msg) => set({ eligibilityErrorMessage: msg }),

  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setPaymentStatus: (status) => set({ paymentStatus: status }),
  setCurrentStage: (stage) => set({ currentStage: stage }),
  setMobileNumber: (number) => set({ mobileNumber: number }),
  setPassMobileNumber: (number) => set({ passMobileNumber: number }),
  setUserId: (id) => set({ userId: id }),
  setPassUserId: (id) => set({ passUserId: id }),
  setOwnerName: (name) => set({ ownerName: name }),

  addVerifiedNumber: (number) =>
    set((state) => ({
      verifiedNumbers: state.verifiedNumbers.includes(number)
        ? state.verifiedNumbers
        : [...state.verifiedNumbers, number],
    })),
}));

export default useDataStore;