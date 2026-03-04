"use client"

import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { ArrowRight, IdCard, Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { AdminLoginValues, adminService } from '@/src/service/adminService';
import { useRouter } from 'next/navigation';
import { useLoginInfoStore } from '@/store/useLoginInfoStore';

const LOGIN_VALUES = {
  loginId: "",
  password: "",
};

export default function AdminLoginPage() {
  const { isSignUp, toggleAuthMode } = useAuthStore();
  const router = useRouter();
  const [loginValues, setLoginValues] = useState<AdminLoginValues>(LOGIN_VALUES) || {};
  const [isAccessPossible, setIsAccessPossible] = useState<boolean>(false);
  const { adminData, setAdminData, clearAdminData } = useLoginInfoStore();

  const changeLoginValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valuesName = e.target.id;

    setLoginValues((prev) => ({
      ...prev,
      [valuesName]: e.target.value,
    }))
  };

  const handleLoginSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginValues.loginId.trim() === "" || loginValues.password.trim() === "") {
      setIsAccessPossible(true);
      return;
    };

    try {
      const res = await adminService.adminLogin(loginValues);
      const adminInfoRes = await adminService.getAdminInfo();

      sessionStorage.setItem('accessToken', res.accessToken);
      setAdminData(adminInfoRes.userInfo);
      router.push('/admin');
    } catch (e) {
      setIsAccessPossible(true);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex justify-center items-center overflow-hidden bg-black p-4">
      {/* 1. 메인 전체 배경 */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-90"
        style={{ backgroundImage: "url('/assets/images/admin-bg.png')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className='relative z-10 w-full max-w-100 md:max-w-250 h-125 md:h-150 flex overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-2xl backdrop-blur-xl'
      >

        {/* --- 1. 회원가입 폼 섹션 ---
          [Mobile]: hidden (보이지 않음)
          [Desktop]: md:flex (보임 + 슬라이딩 로직)
        */}
        <section
          className={`
            hidden md:flex 
            absolute top-0 left-0 h-full w-1/2 
            flex-col justify-center items-center p-12 
            transition-all duration-700 ease-in-out
            ${isSignUp ? 'md:translate-x-full md:opacity-100 md:z-20' : 'md:opacity-0 md:z-0'}
          `}
        >
          <form className='w-full max-w-[320px] flex flex-col items-center'>
            <h1 className='text-3xl font-bold text-white mb-2'>Create Account</h1>
            <p className='text-xs text-gray-300 mb-8'>편집장의 승인이 필요합니다.</p>

            <div className='w-full space-y-4'>
              <div className='relative group'>
                <User className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white/90 transition-colors' size={18} />
                <input type='text' placeholder='NAME' className='w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all' />
              </div>
              <div className='relative group'>
                <IdCard className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white/90 transition-colors' size={18} />
                <input type='text' placeholder='ID' className='w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all' />
              </div>
              <div className='relative group'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white/90 transition-colors' size={18} />
                <input type='email' placeholder='E-MAIL' className='w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all' />
              </div>
              <div className='relative group'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white/90 transition-colors' size={18} />
                <input type='password' placeholder='PASSWORD' className='w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all' />
              </div>

              <button className='cursor-pointer mt-8 w-full bg-linear-to-r from-red-600 to-red-800 text-white font-bold py-3 rounded-lg hover:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.5)] transition-all duration-400 transform'>
                SIGN UP
              </button>
            </div>
          </form>
        </section>

        {/* --- 2. 로그인 폼 섹션 ---
          [Mobile]: w-full, 정중앙 고정 (슬라이딩 효과 없음)
          [Desktop]: w-1/2, 슬라이딩 효과 적용
        */}
        <section className={`
            w-full md:w-1/2 h-full
            flex flex-col justify-center items-center p-8 md:p-12
            
            /* Desktop Animation Logic */
            md:absolute md:top-0 md:left-0 
            md:transition-all md:duration-700 md:ease-in-out
            ${!isSignUp
            ? 'md:z-20 md:opacity-100'
            : 'md:translate-x-[20%] md:opacity-0 md:z-0'
          }
          `}>
          <form
            onSubmit={handleLoginSubmit}
            className='w-full max-w-[320px] flex flex-col items-center'>
            <div className='pb-8 flex flex-col gap-4 text-center'>
              <h1 className='text-3xl font-bold text-white'>LOGIN</h1>
              <p className='mt-2 text-xs font-medium tracking-wider text-gray-400'>
                <span className='text-white font-black'>THE</span>
                <span className='text-red-600 font-black'>&nbsp;IAUTO</span>
                <span className='mx-1'></span>
                CMS DASHBOARD
              </p>
            </div>

            <div className='w-full space-y-4'>
              <div className='relative group'>
                <IdCard className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white/90 transition-colors' size={18} />
                <input
                  type='text'
                  placeholder='ID'
                  id='loginId'
                  onChange={changeLoginValues}
                  className='w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all' />
              </div>

              <div className='relative group'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white/90 transition-colors' size={18} />
                <input
                  type='password'
                  placeholder='PASSWORD'
                  id='password'
                  onChange={changeLoginValues}
                  className='w-full bg-black/40 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all' />
              </div>

              <button className='w-full bg-white text-black font-bold py-3 rounded-lg transition-all transform cursor-pointer hover:shadow-[inset_0_2px_4px_0_rgba(0,0,0,0.5)] duration-400 hover:bg-gray-200'>
                LOGIN
              </button>

              {/* 모바일 전용 문구 */}
              <p className='md:hidden text-xs text-red-400/80 mt-4 text-center'>
                * 관리자 회원가입 및 승인 요청은<br />PC 환경에서만 가능합니다.
              </p>
            </div>
          </form>
        </section>

        <div
          className={`
            hidden md:block 
            absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-40
            ${isSignUp ? '-translate-x-full' : 'translate-x-0'}
          `}
        >
          {/* 배경 이미지 컨테이너 */}
          <div className="absolute inset-0 z-0">
            {/* 이미지 1: 로그인 안내용 */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${isSignUp ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: "url('/assets/images/overlay-bg-1.png')" }}
            />
            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${isSignUp ? 'opacity-100' : 'opacity-0'}`} />

            {/* 이미지 2: 회원가입 안내용 */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${!isSignUp ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: "url('/assets/images/overlay-bg-2.png')" }}
            />
            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 ${!isSignUp ? 'opacity-100' : 'opacity-0'}`} />
          </div>

          {/* 텍스트 슬라이딩 컨테이너 */}
          <div className={`relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out flex z-10
             ${isSignUp ? 'translate-x-1/2' : 'translate-x-0'}            
          `}>

            {/* 왼쪽 텍스트 패널 */}
            <div className={`relative w-1/2 h-full flex flex-col items-center justify-center p-12 text-center transform transition-transform duration-700 ease-in-out
                ${isSignUp ? 'translate-x-0' : '-translate-x-[20%]'}
            `}>
              <h2 className='text-3xl font-bold mb-4 text-white drop-shadow-lg'>Welcome Back</h2>
              <p className='mb-8 text-white/90 text-sm leading-relaxed drop-shadow-md font-medium'>
                이미 계정이 있으신가요?<br />로그인 화면으로 이동합니다.
              </p>
              <button
                onClick={toggleAuthMode}
                className='group flex items-center gap-2 border border-white/50 bg-black/30 backdrop-blur-md text-white py-3 px-8 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer shadow-lg'
              >LOGIN <ArrowRight size={16} className='group-hover:translate-x-1 transition-transform' />
              </button>
            </div>

            {/* 오른쪽 텍스트 패널 */}
            <div className={`relative w-1/2 h-full flex flex-col items-center justify-center p-12 text-center transform transition-transform duration-700 ease-in-out
              ${isSignUp ? 'translate-x-[20%]' : 'translate-x-0'}`}>
              <h2 className='text-3xl font-bold mb-4 text-white drop-shadow-lg'>Hello, Journalist</h2>
              <p className='mb-8 text-white/90 text-sm leading-relaxed drop-shadow-md font-medium'>
                대한민국 대표 자동차 신문<br /><span className='font-bold '>더아이오토</span>에 오신것을 환영합니다.
              </p>
              <button
                onClick={toggleAuthMode}
                className='group flex items-center gap-2 border border-white/50 bg-black/30 backdrop-blur-md text-white py-3 px-8 rounded-full hover:bg-white hover:text-black transition-all cursor-pointer shadow-lg'
              >
                SIGN UP <ArrowRight size={16} className='group-hover:translate-x-1 transition-transform' />
              </button>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  )
}