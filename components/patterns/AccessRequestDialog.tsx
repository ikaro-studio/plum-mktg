'use client';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
  Transition
} from '@headlessui/react';
import { X } from 'lucide-react';
import { Fragment } from 'react';
import EarlyAccessForm from './EarlyAccessForm';
import Heading from '@/components/ui/Heading';
import Body from '@/components/ui/Body';
import Eyebrow from '@/components/ui/Eyebrow';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AccessRequestDialog({ open, onClose }: Props) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-[60]">
        <TransitionChild
          as={Fragment}
          enter="ease-soft duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-soft duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-plum-900/40 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4 md:p-6">
          <TransitionChild
            as={Fragment}
            enter="ease-soft duration-300"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="ease-soft duration-200"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <DialogPanel className="relative w-full max-w-[480px] rounded-xl bg-white shadow-lg p-8 md:p-10">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-2 transition-colors hover:bg-plum-800/5 hover:text-plum-900 focus-visible:outline-none focus-visible:shadow-focus"
              >
                <X size={18} strokeWidth={1.75} aria-hidden />
              </button>
              <Eyebrow className="mb-3">Closed beta</Eyebrow>
              <Heading level={3} className="mb-3">
                Request access.
              </Heading>
              <Body size="sm" className="mb-6">
                Drop your email. We invite in waves of 30 brands — we’ll be in
                touch within a week of the next round opening.
              </Body>
              <EarlyAccessForm tone="panel" source="dialog" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
