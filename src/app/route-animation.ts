import { transition, trigger, query, style, animate, group, sequence } from '@angular/animations'; 

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('Orders => singleOrder', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)' }),
                    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
                ], { optional: true }),
            ])
        ]),
        transition('singleOrder => Orders', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
                ], { optional: true }),
            ])
        ]),
    ]);

export const orderAnimation =
    trigger('anim', [
        transition('* => void', [
            style({ height: '*', opacity: '1', transform: 'translateX(0)', 'box-shadow': 'none' }),
            sequence([
                animate(".25s ease", style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none' })),
                animate(".1s ease", style({ height: '0', opacity: 0, transform: 'translateX(20px)', 'box-shadow': 'none' }))
            ])
        ]),
        transition(':enter', [
            style({ height: '0', opacity: '0', transform: 'translateX(20px)', 'box-shadow': 'none' }),
            sequence([
                animate(".1s ease", style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none' })),
                animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)', 'box-shadow': 'none' }))
            ])
        ]),
    ])